import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display footer links correctly", async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/home");

    const aboutLink = page.locator(
      'a[href="https://www.youtube.com"]'
    );
    const servicesLink = page.locator('a[href="../../../public/services.pdf"]');
    const contactLink = page.locator('a[href="mailto:mail@mail.pl"]');

    await expect(aboutLink).toBeVisible();
    await expect(servicesLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });
});
