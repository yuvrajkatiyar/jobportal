// src/controllers/applications.controller.js
import Application from "../models/Application.js";
import Job from "../models/Job.js";

export async function submitApplication(req, res, next) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const { name, email, coverLetter } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const app = await Application.create({
      jobId,
      name,
      email,
      coverLetter,
      resumeUrl,
    });

    res.json({ success: true, applicationId: app._id });
  } catch (err) { next(err); }
}
