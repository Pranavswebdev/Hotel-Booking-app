import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Space } from "./models/Space.js";
import { spaces } from "./seed-data.js";

// Non-destructive seed: upsert each space by slug. Never deletes existing data.
async function seed() {
  await connectDB();
  const ops = spaces.map((s) => ({
    updateOne: { filter: { slug: s.slug }, update: { $set: s }, upsert: true },
  }));
  const result = await Space.bulkWrite(ops);
  console.log(
    `Upserted spaces — inserted: ${result.upsertedCount}, matched: ${result.matchedCount}`,
  );
  const total = await Space.countDocuments();
  console.log(`Total spaces in DB: ${total}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
