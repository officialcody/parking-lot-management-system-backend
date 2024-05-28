import mongoose from "mongoose";

export default function connect() {
  // MongoDB connection
  mongoose.connect(process.env.MONGODB_URI);
}
