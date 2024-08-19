import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests", // Folder z testami
  /* Run tests in files in parallel */
  fullyParallel: true, // Testy będą uruchamiane równolegle
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, // Blokuje pozostawienie test.only w repozytorium CI
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // Próby ponownego uruchomienia testu w przypadku niepowodzenia w CI
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // Określa liczbę workerów w CI
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html", // Typ raportu: HTML
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry", // Zbieraj trace w przypadku niepowodzenia i ponownego uruchomienia testu
    headless: true, // Tryb bezgłowy
    viewport: { width: 1280, height: 720 }, // Ustawienie rozdzielczości przeglądarki
    video: "retain-on-failure", // Zachowuj nagrania tylko w przypadku niepowodzenia testu
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }, // Ustawienia dla Chromium
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }, // Ustawienia dla Firefox
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }, // Ustawienia dla Webkit
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
