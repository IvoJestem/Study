import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should trigger action when clicking the 'Get Started' button", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/src/pages/home");

    await page.click('button:has-text("Get Started")');

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe(
        "Witaj użytkowniku"
      );
      await dialog.dismiss();
    });
  });
});
