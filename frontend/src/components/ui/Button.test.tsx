import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Reserve</Button>);
    expect(screen.getByRole("button", { name: "Reserve" })).toBeInTheDocument();
  });

  it("fires onClick when pressed", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Login</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the full-width class when fullWidth is set", () => {
    render(<Button fullWidth>Continue</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Set Location</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
