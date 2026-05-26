import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsey values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns an empty string when nothing is passed", () => {
    expect(cn()).toBe("");
  });
});
