import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should log in successfully with valid credentials", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");

    const usernameInput = page.locator(
      'label:has-text("Nazwa użytkownika") + div input'
    );
    const passwordInput = page.locator('label:has-text("Hasło") + div input');

    await usernameInput.waitFor({ state: "visible" });
    await passwordInput.waitFor({ state: "visible" });

    await usernameInput.fill("admin");
    await passwordInput.fill("123");

    await page.click('button[type="submit"]');

    await page.waitForURL("http://localhost:5173/src/pages/home");

    await expect(page).toHaveURL("http://localhost:5173/src/pages/home");
  });
});
