import { test, expect } from "@playwright/test";

test("Form should render correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/src/pages/search/");

  await expect(page.locator("form")).toBeVisible();

  await expect(page.locator('label[for=":r0:"]')).toHaveText("Nazwa");
  await expect(page.locator('label[for=":r2:"]')).toHaveText("Wiek min");
  await expect(page.locator('label[for=":r3:"]')).toHaveText("Wiek max");
  await expect(page.locator('label[for=":r4:"]')).toHaveText("Narodowość");
  await expect(page.locator('label[for=":r5:"]')).toHaveText("Klub");
  await expect(page.locator('label[for=":r6:"]')).toHaveText("Budżet");

  await expect(page.locator('button:has-text("Zatwierdź")')).toBeVisible();
  await expect(page.locator('button:has-text("Edytuj")')).toBeVisible();
  await expect(page.locator('button:has-text("Resetuj")')).toBeVisible();
  await expect(
    page.locator('button:has-text("Generuj Propozycje")')
  ).toBeVisible();
});
