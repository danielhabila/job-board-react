import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
import bodyParser from "body-parser";
app.use(bodyParser.json());

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cors from "cors";
app.use(cors());
import postedjob from "./models/postedJob.js";
import user from "./models/user.js";

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://danielhabila:${process.env.MONGODB_PASSWORD}@cluster0.teaczby.mongodb.net/jobsdb?retryWrites=true&w=majority`
);

app.post("/signup", async (req, res) => {
  //get email and password from req.body
  const { email, password } = req.body;

  // hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  //create a user with the data
  await user.create({ email, hashedPassword });
  //respond to frontend
  res.sendStatus(200);
});
app.post("login", (req, res) => {});
app.get("logout", (req, res) => {});

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
app.post("/CreateJob", (req, res) => {
  // code to handle creating a job listing
  const newJob = req.body; // retrieve the data sent in the request body

  postedjob.create(newJob, (err, savedJob) => {
    if (err) {
      // handle the error
      res.status(500).send(err);
    } else {
      // send a response with the saved job
      res.status(201).json(savedJob);
    }
  });
});

app.listen(6000, () => {
  console.log("Server listening on port 6000");
});
