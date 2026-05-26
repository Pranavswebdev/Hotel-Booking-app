import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Space } from "./models/Space.js";
import { spaces } from "./seed-data.js";

// Destructive reseed: clears the spaces collection then inserts fresh data.
// For a safe, idempotent seed against shared databases use seed-upsert.js.
async function seed() {
  await connectDB();
  await Space.deleteMany({});
  await Space.insertMany(spaces);
  console.log(`Seeded ${spaces.length} spaces`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
