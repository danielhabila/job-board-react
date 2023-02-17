import mongoose from "mongoose";

const crawledJobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  sticky: {
    type: Boolean,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  jobDescription: {
    type: String,
    required: false,
  },
  salaryPrecise: {
    type: Number,
    required: false,
  },
  salaryRange: {
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },
  jobType: {
    commitment: {
      type: String,
      required: false,
    },
    flexibility: {
      type: String,
      required: false,
    },
    contract: {
      type: String,
      required: false,
    },
  },
  websiteURL: {
    type: String,
    required: false,
  },
  contactEmail: {
    type: String,
    required: false,
  },
  applyURL: {
    type: String,
    required: false,
  },
  companyLogo: {
    data: Buffer,
    contentType: String,
    require: false,
  },
  posted_date: { type: Date, default: Date.now },
});

const crawledjob = mongoose.model("crawledjob", crawledJobSchema);

export default crawledjob;
