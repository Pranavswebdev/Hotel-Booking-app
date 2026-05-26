import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(
  __dirname,
  "../../.devmind/test-screenshots/responsive",
);

const shots = [
  { name: "login", path: "/login" },
  { name: "home", path: "/home" },
  { name: "search", path: "/search" },
  { name: "space-details", path: "/space/avenzel-cibubur" },
];

const viewports = [
  { label: "mobile", width: 393, height: 852 },
  { label: "tablet", width: 834, height: 1112 },
  { label: "desktop", width: 1280, height: 900 },
];

test("responsive capture (chromium only)", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "capture once on chromium");
  fs.mkdirSync(OUT, { recursive: true });

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const s of shots) {
      await page.goto(s.path);
      await page.waitForTimeout(700);
      await page.screenshot({
        path: path.join(OUT, `${s.name}-${vp.label}.png`),
        fullPage: vp.label !== "mobile",
      });
    }
  }
});
