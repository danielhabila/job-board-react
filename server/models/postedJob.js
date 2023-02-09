import mongoose from "mongoose";

const postedJobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },
  // location: {
  //   type: String,
  //   required: true,
  // },
  jobDescription: {
    type: String,
    required: true,
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
      required: true,
    },
    flexibility: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
  },
  websiteURL: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  applyURL: {
    type: String,
    required: true,
  },
  companyLogo: {
    data: Buffer,
    type: String,
    require: false,
  },

  posted_date: { type: Date, default: Date.now },
});

const postedjob = mongoose.model("postedjob", postedJobSchema);

export default postedjob;
