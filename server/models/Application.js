const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Applied", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
