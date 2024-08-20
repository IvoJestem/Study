import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test("should register successfully with valid data", async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/register");

    await page.fill(
      'label:has-text("Imię i nazwisko") + div input',
      "Jan Kowalski"
    );
    await page.fill(
      'label:has-text("Nazwa użytkownika") + div input',
      "jan.kowalski"
    );
    await page.fill('label:has-text("Hasło") + div input', "password123");
    await page.fill(
      'label:has-text("Powtórz hasło") + div input',
      "password123"
    );
    await page.fill('label:has-text("Klub") + div input', "Example Club");

    await page.click('button[type="submit"]');

    await page.waitForURL("http://localhost:5173/");
    await expect(page).toHaveURL("http://localhost:5173/");
  });
});
