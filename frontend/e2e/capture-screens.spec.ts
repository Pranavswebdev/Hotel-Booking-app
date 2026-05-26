import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(__dirname, "../../.devmind/test-screenshots/screens");

const screens: Array<{ name: string; path: string; setup?: string }> = [
  { name: "01-login", path: "/login" },
  { name: "02-signup", path: "/signup" },
  { name: "03-verify", path: "/verify" },
  { name: "04-forgot-password", path: "/forgot-password" },
  { name: "05-home", path: "/home" },
  { name: "06-search", path: "/search" },
  { name: "07-search-no-results", path: "/search", setup: "no-results" },
  { name: "08-discover-map", path: "/discover" },
  { name: "09-space-details", path: "/space/avenzel-cibubur" },
  { name: "10-booking-date", path: "/booking/date?space=avenzel-cibubur" },
  {
    name: "11-booking-payment",
    path: "/booking/payment?space=avenzel-cibubur&nights=3",
  },
  { name: "12-booking-confirmation", path: "/booking/confirmation" },
  { name: "13-profile", path: "/profile" },
  { name: "14-chat", path: "/chat" },
];

test.use({ viewport: { width: 393, height: 852 } });

test("capture all screens (chromium only)", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "capture once on chromium");
  fs.mkdirSync(OUT, { recursive: true });

  for (const s of screens) {
    await page.goto(s.path);
    if (s.setup === "no-results") {
      await page.getByPlaceholder("Search Spaces...").fill("zzzznowhere");
      await page
        .getByRole("heading", { name: "The Place Doesn't Exist" })
        .waitFor();
    }
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(OUT, `${s.name}.png`),
      fullPage: true,
    });
  }
});
