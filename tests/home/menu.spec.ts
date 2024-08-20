import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should toggle the slide-out menu when clicking the menu button", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/src/pages/home");

    const menuButton = page.locator('button:has(svg[data-testid="MenuIcon"])');
    await menuButton.waitFor({ state: "visible", timeout: 10000 });
    await menuButton.click();

    await page.waitForTimeout(2000);

    const slideOutMenu = page.locator("nav.MuiBox-root.css-f1z8h8");
    await expect(slideOutMenu).toBeVisible({ timeout: 10000 });

    await menuButton.click();
  });
});
