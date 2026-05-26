import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "../src/utils/token.js";

describe("token utils", () => {
  it("signs a token that round-trips to the same user id", () => {
    const token = signToken("507f1f77bcf86cd799439011");
    const payload = verifyToken(token);
    expect(payload.sub).toBe("507f1f77bcf86cd799439011");
  });

  it("throws on a tampered token", () => {
    expect(() => verifyToken("not.a.valid.token")).toThrow();
  });
});
