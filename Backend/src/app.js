// src/app.js
import "dotenv/config";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";
import appsRoutes from "./routes/applications.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";

const app = express();

// Connect to MongoDB
await connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api", appsRoutes);

// error handler
app.use(errorHandler);

export default app;