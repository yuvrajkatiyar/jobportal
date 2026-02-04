// src/controllers/auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
}

export async function register(req, res, next) {
  // Register normal user (role: user)
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, role: "user" });
    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) { next(err); }
}

export async function registerCompany(req, res, next) {
  // Register company account (role: company)
  try {
    const { name, email, password, company } = req.body; // company: {name, website, location, description}
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, role: "company", company });
    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, company: user.company }, token });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, company: user.company }, token });
  } catch (err) { next(err); }
}

export async function me(req, res) {
  const user = await User.findById(req.userId).select("-passwordHash");
  res.json({ user });
}
