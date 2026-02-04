// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "company", "admin"], default: "user" },
  // only for company accounts
  company: {
    name: String,
    website: String,
    location: String,
    description: String
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
