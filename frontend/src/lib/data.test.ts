import { describe, it, expect } from "vitest";
import { categories, formatRp, normalizeSpace, type ApiSpace } from "./data";

describe("categories", () => {
  it("exposes the four space categories", () => {
    expect(categories).toEqual(["Hotel", "Apartment", "Guest House", "Villa"]);
  });
});

describe("normalizeSpace", () => {
  const apiSpace: ApiSpace = {
    _id: "abc123",
    slug: "avenzel-cibubur",
    name: "Avenzel Hotel",
    location: "Cibubur, West Java, Indonesia",
    pricePerNight: 1101030,
    rating: 4.9,
    category: "Hotel",
    guests: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
  };

  it("maps slug to id", () => {
    expect(normalizeSpace(apiSpace).id).toBe("avenzel-cibubur");
  });

  it("defaults missing optional fields", () => {
    const s = normalizeSpace(apiSpace);
    expect(s.nights).toBe(1);
    expect(s.reviewCount).toBe(0);
    expect(s.description).toBe("");
    expect(s.image).toMatch(/^https:\/\//);
  });

  it("preserves provided values", () => {
    const s = normalizeSpace({ ...apiSpace, reviewCount: 15, image: "https://x/y.png" });
    expect(s.reviewCount).toBe(15);
    expect(s.image).toBe("https://x/y.png");
    expect(s.name).toBe("Avenzel Hotel");
  });
});

describe("formatRp", () => {
  it("formats with the rupee symbol and Indian grouping", () => {
    expect(formatRp(1101030)).toBe("₹11,01,030");
  });

  it("formats zero", () => {
    expect(formatRp(0)).toBe("₹0");
  });
});
