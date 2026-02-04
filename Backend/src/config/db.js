import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job-portal";

  // Mongoose 7+ auto-handles the old options (useNewUrlParser, useUnifiedTopology, etc.)
  await mongoose.connect(uri);

  console.log("✅ MongoDB connected");
}