import mongoose from "mongoose";

const postedJobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  posted_date: { type: Date, default: Date.now },
});

const postedjob = mongoose.model("postedjob", postedJobSchema);

export default postedjob;
