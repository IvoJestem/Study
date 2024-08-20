import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test("should show error message for taken username", async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/register");

    await page.fill(
      'label:has-text("Imię i nazwisko") + div input',
      "Anna Nowak"
    );
    await page.fill('label:has-text("Nazwa użytkownika") + div input', "admin");
    await page.fill('label:has-text("Hasło") + div input', "password123");
    await page.fill(
      'label:has-text("Powtórz hasło") + div input',
      "password123"
    );

    await page.click('button[type="submit"]');

    const errorMessage = page.locator(
      'text="Nazwa użytkownika jest już zajęta"'
    );
    await expect(errorMessage).toBeVisible();
  });
});
