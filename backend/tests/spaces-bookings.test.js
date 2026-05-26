import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { Space } from "../src/models/Space.js";

const app = createApp();

const sampleSpace = {
  slug: "avenzel-cibubur",
  name: "Avenzel Hotel",
  location: "Cibubur, West Java, Indonesia",
  pricePerNight: 1101030,
  rating: 4.9,
  category: "Hotel",
  guests: 2,
};

async function authToken() {
  const reg = await request(app)
    .post("/api/auth/register")
    .send({ email: "booker@example.com", password: "secret123" });
  await request(app)
    .post("/api/auth/verify")
    .send({ email: "booker@example.com", code: reg.body.devVerificationCode });
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "booker@example.com", password: "secret123" });
  return login.body.token;
}

describe("spaces API", () => {
  beforeEach(async () => {
    await Space.create(sampleSpace);
    await Space.create({
      ...sampleSpace,
      slug: "songgoroti-villa",
      name: "Songgoroti Villa",
      location: "Malang",
      category: "Villa",
    });
  });

  it("lists all spaces", async () => {
    const res = await request(app).get("/api/spaces");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
  });

  it("filters spaces by category", async () => {
    const res = await request(app).get("/api/spaces?category=Villa");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
    expect(res.body.spaces[0].name).toBe("Songgoroti Villa");
  });

  it("searches spaces by query", async () => {
    const res = await request(app).get("/api/spaces?q=avenzel");
    expect(res.body.count).toBe(1);
  });

  it("returns a single space by slug", async () => {
    const res = await request(app).get("/api/spaces/avenzel-cibubur");
    expect(res.status).toBe(200);
    expect(res.body.space.name).toBe("Avenzel Hotel");
  });

  it("returns 404 for an unknown space", async () => {
    const res = await request(app).get("/api/spaces/does-not-exist");
    expect(res.status).toBe(404);
  });
});

describe("bookings API", () => {
  beforeEach(async () => {
    await Space.create(sampleSpace);
  });

  it("blocks unauthenticated booking with 401", async () => {
    const res = await request(app).post("/api/bookings").send({});
    expect(res.status).toBe(401);
  });

  it("creates a booking and computes total price", async () => {
    const token = await authToken();
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        spaceId: "avenzel-cibubur",
        checkIn: "2025-04-10",
        checkOut: "2025-04-13",
        members: 2,
        guestName: "Hasbi Kinclaid",
        phone: "+62 85711180040",
        idCardNumber: "349812470598137",
      });
    expect(res.status).toBe(201);
    expect(res.body.booking.nights).toBe(3);
    expect(res.body.booking.totalPrice).toBe(1101030 * 3);
  });

  it("rejects a booking whose checkout precedes checkin", async () => {
    const token = await authToken();
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        spaceId: "avenzel-cibubur",
        checkIn: "2025-04-13",
        checkOut: "2025-04-10",
        guestName: "X",
        phone: "1",
        idCardNumber: "1",
      });
    expect(res.status).toBe(400);
  });
});

describe("profile API", () => {
  it("returns and updates the authenticated user's profile", async () => {
    const token = await authToken();
    const me = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe("booker@example.com");

    const upd = await request(app)
      .put("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Hasbi Kinclaid", gender: "Male" });
    expect(upd.status).toBe(200);
    expect(upd.body.user.name).toBe("Hasbi Kinclaid");
    expect(upd.body.user.gender).toBe("Male");
  });
});
