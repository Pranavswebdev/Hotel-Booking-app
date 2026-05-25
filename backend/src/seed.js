import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Space } from "./models/Space.js";

const spaces = [
  {
    slug: "avenzel-cibubur",
    name: "Avenzel Hotel",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 1101030,
    rating: 4.9,
    reviewCount: 15,
    category: "Hotel",
    guests: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    description:
      "Twin Bed Special Room. Self check-in with a code sent after reserving.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    slug: "hotel-o-cibubur",
    name: "Hotel O Cibubur",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 300352,
    rating: 4.89,
    reviewCount: 32,
    category: "Hotel",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    slug: "apartment-cipayung",
    name: "Apartment in Cipayung",
    location: "Cipayung, East Jakarta",
    pricePerNight: 450765,
    rating: 4.95,
    reviewCount: 21,
    category: "Apartment",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    slug: "apartment-pondok-gede",
    name: "Apartment in Pondok Gede",
    location: "Pondok Gede, East Jakarta",
    pricePerNight: 393280,
    rating: 4.89,
    reviewCount: 18,
    category: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    slug: "songgoroti-villa",
    name: "Songgoroti Villa",
    location: "Songgoroti Street 68, Malang",
    pricePerNight: 1844274,
    rating: 5,
    reviewCount: 9,
    category: "Villa",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    slug: "reddoorz-cibubur",
    name: "Reddoorz near Cibubur",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 368854,
    rating: 5,
    reviewCount: 12,
    category: "Guest House",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  },
];

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
