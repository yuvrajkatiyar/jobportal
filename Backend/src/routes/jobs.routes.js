// src/routes/jobs.routes.js
import express from "express";
import { listJobs, getJob, createJob } from "../controllers/jobs.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import requireRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", listJobs);
router.get("/:id", getJob);
// Only authenticated company accounts can create jobs:
router.post("/", authMiddleware, requireRole("company"), createJob);

export default router;
