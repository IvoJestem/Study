import { test } from "@playwright/test";

test("Should click on buttons", async ({ page }) => {
  await page.goto("http://localhost:5173/src/pages/search/");

  await page.click('button:has-text("Edytuj")');

  await page.click('button:has-text("Resetuj")');

  await page.click('button:has-text("Generuj Propozycje")');
});
