import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test('should navigate to the registration page when clicking the "Register" button', async ({
    page,
  }) => {
    await page.goto("/");

    const registerButton = page.locator("button", { hasText: "Zarejestruj" });
    await registerButton.click();

    await page.waitForURL("http://localhost:5173/src/pages/register");

    await expect(page).toHaveURL("http://localhost:5173/src/pages/register");
  });
});
