import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cors from "cors";
import postedjob from "./models/postedJob.js";
import user from "./models/user.js";
import cookieParser from "cookie-parser";
import { createToken, requireAuth } from "./JWT.js";
import upload from "./middleware/upload.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`);

app.post("/signup", async (req, res) => {
  try {
    //get email and password from req.body
    const { email, password } = req.body;

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //create a user with the data
    await user.create({ email, password: hashedPassword });
    //respond to frontend
    res.json("user registered");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    //get the email and password from req.body
    const { email, password } = req.body;

    //find the user with requested email
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      return res.sendStatus(401).json("user doesn't exist");
    }
    //compare submitted password with the hashed password for user
    const passwordMatch = bcrypt.compareSync(password, foundUser.password);
    if (!passwordMatch) {
      return res.sendStatus(401).json("password doesn't match");
    } else {
      //create a jwt token. This is how we can tell which user is logged in.  -----
      const accessToken = createToken(foundUser);
      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
      //create cookie to store in users browser
      res.cookie("authorization", accessToken, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
      });

      //send the jwt token
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/logout", (req, res) => {
  try {
    res.clearCookie("authorization");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/checkAuth", requireAuth, (req, res) => {
  console.log(req.userById);
  res.sendStatus(200);
});

//Pull and display all jobs from DB
app.get("/ReadJob", (req, res) => {
  postedjob.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//Push jobs to DB
app.post("/CreateJob", upload.single("companyLogo"), (req, res) => {
  try {
    const newJob = new postedjob({
      // retrieve the data sent in the request body
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      location: req.body.location,
      jobDescription: req.body.jobDescription,
      salaryPrecise: req.body.salaryPrecise,
      salaryRange: req.body.salaryRange,
      jobType: req.body.jobType,
      websiteURL: req.body.websiteURL,
      contactEmail: req.body.contactEmail,
      applyURL: req.body.applyURL,
      companyLogo: {
        data: req.file.filename,
        contentType: req.file.mimetype,
      },
      posted_date: new Date(),
    });

    // check if a file was uploaded
    if (req.file) {
      newJob.companyLogo = {
        data: req.file.filename,
        contentType: req.file.mimetype,
      };
    }
    //-----------------------------------------

    postedjob.create(newJob, (err, savedJob) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(savedJob);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
