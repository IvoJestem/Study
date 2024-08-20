import { test } from "@playwright/test";

test("Should fill out the form and submit", async ({ page }) => {
  await page.goto("http://localhost:5173/src/pages/search/");

  await page.fill('input[id=":r0:"]', "Jan Kowalski");
  await page.fill('input[id=":r2:"]', "18");
  await page.fill('input[id=":r3:"]', "25");
  await page.fill('input[id=":r4:"]', "Polska");
  await page.fill('input[id=":r5:"]', "Legia Warszawa");
  await page.fill('input[id=":r6:"]', "100000");

  await page.click('div[role="combobox"][aria-label="Pozycja"]');
  await page.click("text=Napastnik");
});
