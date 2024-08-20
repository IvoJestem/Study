import { test, expect } from "@playwright/test";

test.describe("CardTable Content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/src/pages/transferlist/");
  });

  test("should display card content correctly", async ({ page }) => {
    const firstRow = page.locator("table tbody tr:first-child");

    const name = await firstRow.locator("td:nth-of-type(1)").textContent();
    const position = await firstRow.locator("td:nth-of-type(2)").textContent();
    const age = await firstRow.locator("td:nth-of-type(3)").textContent();
    const nation = await firstRow.locator("td:nth-of-type(4)").textContent();
    const club = await firstRow.locator("td:nth-of-type(5)").textContent();
    const price = await firstRow.locator("td:nth-of-type(6)").textContent();

    expect(name).not.toBeNull();
    expect(position).not.toBeNull();
    expect(age).not.toBeNull();
    expect(nation).not.toBeNull();
    expect(club).not.toBeNull();
    expect(price).not.toBeNull();
  });
});
