import { test, expect } from "@playwright/test";

test.describe("CardTable Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/transferlist/");
  });

  test("should render CardTable with initial cards", async ({ page }) => {
    await expect(page.locator("table")).toBeVisible();

    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });
});
