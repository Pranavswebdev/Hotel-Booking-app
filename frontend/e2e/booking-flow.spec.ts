import { test, expect } from "@playwright/test";

test.describe("Jiva Space — dynamic flows", () => {
  test("root redirects to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
  });

  test("home loads spaces from the API", async ({ page }) => {
    await page.goto("/home");
    // Seeded space name proves the data came from the backend, not mocks.
    await expect(page.getByText("Avenzel Hotel").first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("space details loads from the API", async ({ page }) => {
    await page.goto("/space/avenzel-cibubur");
    await expect(page.getByText(/Avenzel Hotel/).first()).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText("₹").first()).toBeVisible();
  });

  test("login with invalid credentials shows an API error", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("example@gmail.com").fill("nobody@example.com");
    await page.getByPlaceholder("123@!#").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({
      timeout: 15000,
    });
  });

  test("signup requires matching passwords", async ({ page }) => {
    await page.goto("/signup");
    await page.getByPlaceholder("example@gmail.com").fill("new@example.com");
    const pw = page.getByPlaceholder("123@!#");
    await pw.nth(0).fill("secret123");
    await pw.nth(1).fill("different");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("search shows a no-results state for unknown query", async ({ page }) => {
    await page.goto("/search");
    await page.getByPlaceholder("Search Spaces...").fill("zzzznowhere");
    await expect(
      page.getByRole("heading", { name: "The Place Doesn't Exist" }),
    ).toBeVisible({ timeout: 15000 });
  });

  test("profile redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login$/);
  });

  // Full write-path integration: register a unique user, verify, then book.
  // Chromium-only to limit test data written to the shared database.
  test("register, verify and complete a booking", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "write-path runs once");

    const email = `e2e+${Date.now()}@example.com`;

    await page.goto("/signup");
    await page.getByPlaceholder("example@gmail.com").fill(email);
    const pw = page.getByPlaceholder("123@!#");
    await pw.nth(0).fill("secret123");
    await pw.nth(1).fill("secret123");
    await page.getByRole("button", { name: "Sign Up" }).click();

    // Verify screen surfaces the dev code; type it in.
    await expect(page).toHaveURL(/\/verify/, { timeout: 15000 });
    const hint = await page
      .getByText(/your code is/i)
      .textContent({ timeout: 15000 });
    const code = hint?.match(/\d{4}/)?.[0] ?? "";
    expect(code).toMatch(/^\d{4}$/);
    const boxes = page.getByRole("textbox");
    for (let i = 0; i < 4; i++) await boxes.nth(i).fill(code[i]);
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/home$/, { timeout: 15000 });

    // Book the featured space.
    await page.goto("/space/avenzel-cibubur");
    await page.getByRole("button", { name: "Reserve" }).click();
    await page.getByRole("button", { name: "10", exact: true }).click();
    await page.getByRole("button", { name: "13", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/booking\/payment/);
    await page.getByPlaceholder("Hasbi Kinclaid").fill("E2E Tester");
    await page.getByPlaceholder("+62 85711180040").fill("+62 800000000");
    await page.getByPlaceholder("349812470598137").fill("123456789012345");
    await page.getByRole("button", { name: "Payment Method" }).click();

    await expect(page).toHaveURL(/\/booking\/confirmation/, { timeout: 15000 });
    await expect(page.getByText("Successfully")).toBeVisible();
  });
});
