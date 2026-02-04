// src/controllers/jobs.controller.js
import Job from "../models/Job.js";

export async function listJobs(req, res, next) {
  try {
    const { q, location, type, page = 1, pageSize = 20 } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { tags: { $in: q.split(",").map(s => s.trim()) } }
    ];
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;

    const skip = (Number(page) - 1) * Number(pageSize);
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(pageSize));
    const total = await Job.countDocuments(filter);
    res.json({ total, page: Number(page), pageSize: Number(pageSize), jobs });
  } catch (err) { next(err); }
}

export async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) { next(err); }
}

export async function createJob(req, res, next) {
  try {
    const data = req.body;
    data.createdBy = req.userId;
    const job = await Job.create(data);
    res.status(201).json(job);
  } catch (err) { next(err); }
}
