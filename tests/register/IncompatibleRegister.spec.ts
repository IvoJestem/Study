import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test("should show error message when passwords do not match", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/src/pages/register");

    await page.fill(
      'label:has-text("Imię i nazwisko") + div input',
      "Marek Nowak"
    );
    await page.fill(
      'label:has-text("Nazwa użytkownika") + div input',
      "marek.nowak"
    );
    await page.fill('label:has-text("Hasło") + div input', "password123");
    await page.fill(
      'label:has-text("Powtórz hasło") + div input',
      "differentpassword"
    );

    await page.click('button[type="submit"]');

    const errorMessage = page.locator('text="Hasła się nie zgadzają"');
    await expect(errorMessage).toBeVisible();
  });
});
