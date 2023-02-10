import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postedjob from "./models/postedJob.js";
import upload from "./middleware/upload.js";

const app = express();
app.use(bodyParser.json());
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
    const newJob = req.body; // retrieve the data sent in the request body

    // check if a file was uploaded
    if (req.file) {
      newJob.companyLogo = {
        data: req.file.filename,
        contentType: req.file.mimetype,
      };
    }

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
