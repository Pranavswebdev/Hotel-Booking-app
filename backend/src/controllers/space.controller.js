import { Space } from "../models/Space.js";
import { ApiError } from "../middleware/error.js";

export async function listSpaces(req, res, next) {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category && category !== "All" && category !== "Near You") {
      filter.category = category;
    }
    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      filter.$or = [{ name: regex }, { location: regex }];
    }
    const spaces = await Space.find(filter).sort({ rating: -1 });
    res.json({ count: spaces.length, spaces });
  } catch (err) {
    next(err);
  }
}

export async function getSpace(req, res, next) {
  try {
    const { id } = req.params;
    const space = await Space.findOne({ slug: id }).lean();
    const found = space || (await Space.findById(id).lean().catch(() => null));
    if (!found) throw new ApiError(404, "Space not found");
    res.json({ space: found });
  } catch (err) {
    next(err);
  }
}
