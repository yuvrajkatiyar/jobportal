// src/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: String,
  email: String,
  coverLetter: String,
  resumeUrl: String,
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
