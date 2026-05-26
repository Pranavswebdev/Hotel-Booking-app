import { Space } from "../models/Space.js";
import { spaces } from "../seed-data.js";
import { config } from "../config/env.js";
import { ApiError } from "../middleware/error.js";

// Non-destructive upsert seed, runnable from the deployed environment (which
// can reach Atlas). Guarded by a shared secret so it is not publicly abusable.
export async function seedSpaces(req, res, next) {
  try {
    if (!config.seedSecret || req.get("x-seed-secret") !== config.seedSecret) {
      throw new ApiError(403, "Forbidden");
    }
    const ops = spaces.map((s) => ({
      updateOne: { filter: { slug: s.slug }, update: { $set: s }, upsert: true },
    }));
    const result = await Space.bulkWrite(ops);
    const total = await Space.countDocuments();
    res.json({
      message: "Spaces seeded",
      upserted: result.upsertedCount,
      matched: result.matchedCount,
      total,
    });
  } catch (err) {
    next(err);
  }
}
