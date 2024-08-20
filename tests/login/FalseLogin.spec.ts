import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should display an error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");

    const usernameInput = page.locator(
      'label:has-text("Nazwa użytkownika") + div input'
    );
    const passwordInput = page.locator('label:has-text("Hasło") + div input');

    await usernameInput.waitFor({ state: "visible" });
    await passwordInput.waitFor({ state: "visible" });

    await usernameInput.fill("marek");
    await passwordInput.fill("moczko");

    await page.click('button[type="submit"]');

    await page.waitForSelector(
      'text="Niepoprawna nazwa użytkownika lub hasło"',
      {
        state: "visible",
        timeout: 10000,
      }
    );

    const errorMessage = page.locator(
      'text="Niepoprawna nazwa użytkownika lub hasło"'
    );
    await expect(errorMessage).toBeVisible();
  });
});
