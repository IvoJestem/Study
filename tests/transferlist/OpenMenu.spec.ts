import { test } from "@playwright/test";

test.describe("Open Menu Button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/transferlist/");
  });

  test("should open the slide-out menu when the button is clicked", async ({
    page,
  }) => {
    await page.click('button:has-text("Open Menu")');

    await page.waitForTimeout(2000);
  });
});
