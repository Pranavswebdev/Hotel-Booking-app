import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["Hotel", "Apartment", "Guest House", "Villa"],
      required: true,
    },
    guests: { type: Number, default: 1 },
    bedrooms: { type: Number, default: 1 },
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

spaceSchema.index({ name: "text", location: "text" });

export const Space = mongoose.model("Space", spaceSchema);
