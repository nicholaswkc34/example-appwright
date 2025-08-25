import { defineConfig, Platform } from "appwright";
import { environment } from './src/config/environment'
import path from "path";

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    actionTimeout: environment.test.timeout,
    navigationTimeout: environment.test.timeout,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    userAgent: 'Playwright-ShippingPlatform-Automation',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  projects: [
    // {
    //   name: "ios",
    //   use: {
    //     platform: Platform.IOS,
    //     device: {
    //       provider: "emulator",
    //       name: "iPhone 14 Pro",
    //     },
    //     buildPath: path.join("builds", "Wikipedia.app"),
    //   },
    // },
    {
      name: "android",
      use: {
        platform: Platform.ANDROID,
        device: {
          provider: "emulator",
        },
        buildPath: path.join("builds", environment.baseApk),
      },
    },
  ],
  globalSetup: './tests/setup/global-setup',
  globalTeardown: './tests/setup/global-teardown',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  outputDir: 'test-results/',
  preserveOutput: 'failures-only',
  maxFailures: process.env.CI ? 10 : 0,
  metadata: {
    'test-environment': environment.environment,
    'base-apk': environment.baseApk,
    browser: environment.test.browser
  }
});
