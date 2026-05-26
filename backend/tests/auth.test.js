import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

async function registerUser(email = "user@example.com") {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ email, password: "secret123" });
  return res;
}

describe("auth API", () => {
  let api;
  beforeEach(() => {
    api = request(app);
  });

  it("registers a new user and returns a dev verification code", async () => {
    const res = await registerUser();
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("user@example.com");
    expect(res.body.user.isVerified).toBe(false);
    expect(res.body.devVerificationCode).toMatch(/^\d{4}$/);
  });

  it("rejects invalid registration input with 422", async () => {
    const res = await api
      .post("/api/auth/register")
      .send({ email: "bad", password: "12" });
    expect(res.status).toBe(422);
    expect(res.body.errors).toHaveLength(2);
  });

  it("rejects duplicate email with 409", async () => {
    await registerUser();
    const res = await registerUser();
    expect(res.status).toBe(409);
  });

  it("logs in with correct credentials and returns a JWT", async () => {
    await registerUser();
    const res = await api
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it("rejects login with wrong password", async () => {
    await registerUser();
    const res = await api
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("verifies email with the issued code", async () => {
    const reg = await registerUser();
    const res = await api
      .post("/api/auth/verify")
      .send({ email: "user@example.com", code: reg.body.devVerificationCode });
    expect(res.status).toBe(200);
    expect(res.body.user.isVerified).toBe(true);
    expect(res.body.token).toBeTruthy();
  });

  it("rejects verification with a wrong code", async () => {
    await registerUser();
    const res = await api
      .post("/api/auth/verify")
      .send({ email: "user@example.com", code: "0000" });
    expect(res.status).toBe(400);
  });

  it("issues and consumes a password reset token", async () => {
    await registerUser();
    const forgot = await api
      .post("/api/auth/forgot-password")
      .send({ email: "user@example.com" });
    expect(forgot.status).toBe(200);
    const token = forgot.body.devResetToken;
    expect(token).toBeTruthy();

    const reset = await api
      .post("/api/auth/reset-password")
      .send({ token, password: "newsecret123" });
    expect(reset.status).toBe(200);

    const login = await api
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "newsecret123" });
    expect(login.status).toBe(200);
  });

  it("does not reveal unknown emails on forgot-password", async () => {
    const res = await api
      .post("/api/auth/forgot-password")
      .send({ email: "ghost@example.com" });
    expect(res.status).toBe(200);
    expect(res.body.devResetToken).toBeUndefined();
  });
});
