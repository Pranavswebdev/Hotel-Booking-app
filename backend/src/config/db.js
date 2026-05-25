import mongoose from "mongoose";
import { config } from "./env.js";

let connection = null;

export async function connectDB() {
  if (connection) return connection;
  mongoose.set("strictQuery", true);
  connection = await mongoose.connect(config.mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}
