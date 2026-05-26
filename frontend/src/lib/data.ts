export const categories = ["Hotel", "Apartment", "Guest House", "Villa"] as const;
export type Category = (typeof categories)[number];

export type Space = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  nights: number;
  rating: number;
  reviewCount: number;
  category: Category;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  description: string;
  image: string;
};

/** Shape returned by the backend API. */
export type ApiSpace = {
  _id: string;
  slug: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewCount?: number;
  category: Category;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  description?: string;
  image?: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

/** Normalize an API space into the shape the UI components expect. */
export function normalizeSpace(s: ApiSpace): Space {
  return {
    id: s.slug,
    name: s.name,
    location: s.location,
    pricePerNight: s.pricePerNight,
    nights: 1,
    rating: s.rating ?? 0,
    reviewCount: s.reviewCount ?? 0,
    category: s.category,
    guests: s.guests ?? 1,
    bedrooms: s.bedrooms ?? 1,
    beds: s.beds ?? 1,
    baths: s.baths ?? 1,
    description: s.description ?? "",
    image: s.image || FALLBACK_IMAGE,
  };
}

export function formatRp(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}
