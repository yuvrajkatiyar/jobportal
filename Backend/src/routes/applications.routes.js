// src/routes/applications.routes.js
import express from "express";
import multer from "multer";
import { submitApplication } from "../controllers/applications.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"; // optional

const router = express.Router();
const storage = multer.diskStorage({ destination: (req, file, cb) => cb(null, "uploads/"), filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) });
const upload = multer({ storage });

// If you want anyone (including unauthenticated) to apply, don't use authMiddleware.
// If you want only logged in users, use authMiddleware.
router.post("/jobs/:id/apply", authMiddleware, upload.single("resume"), submitApplication);

export default router;
