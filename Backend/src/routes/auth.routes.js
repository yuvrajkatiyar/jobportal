// src/routes/auth.routes.js
import express from "express";
import { register, login, me, registerCompany } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/register-company", registerCompany); // new company route
router.post("/login", login);
router.get("/me", authMiddleware, me);

export default router;
