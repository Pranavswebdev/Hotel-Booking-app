export type Space = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  nights: number;
  rating: number;
  category: "Hotel" | "Apartment" | "Guest House" | "Villa";
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  image: string;
};

// Prices in IDR, matching the Figma "Rp" copy.
export const spaces: Space[] = [
  {
    id: "avenzel-cibubur",
    name: "Avenzel Hotel",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 1101030,
    nights: 1,
    rating: 4.9,
    category: "Hotel",
    guests: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "hotel-o-cibubur",
    name: "Hotel O Cibubur",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 300352,
    nights: 1,
    rating: 4.89,
    category: "Hotel",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    id: "apartment-cipayung",
    name: "Apartment in Cipayung",
    location: "Cipayung, East Jakarta",
    pricePerNight: 450765,
    nights: 2,
    rating: 4.95,
    category: "Apartment",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: "apartment-pondok-gede",
    name: "Apartment in Pondok Gede",
    location: "Pondok Gede, East Jakarta",
    pricePerNight: 393280,
    nights: 5,
    rating: 4.89,
    category: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: "songgoroti-villa",
    name: "Songgoroti Villa",
    location: "Songgoroti Street 68, Malang",
    pricePerNight: 1844274,
    nights: 5,
    rating: 5,
    category: "Villa",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: "reddoorz-cibubur",
    name: "Reddoorz near Cibubur",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 368854,
    nights: 5,
    rating: 5,
    category: "Guest House",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  },
];

export const categories = ["Hotel", "Apartment", "Guest House", "Villa"] as const;

export function getSpace(id: string): Space | undefined {
  return spaces.find((s) => s.id === id);
}

export function formatRp(value: number): string {
  return "Rp" + value.toLocaleString("id-ID");
}
