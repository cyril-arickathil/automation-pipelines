import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './testOptions';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({

  timeout: 40*1000,
  globalTimeout: 1*60*60*1000, //1 hour timeout
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry twice on CI , once when running in local */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', {outputFile: 'test-results/json-reports.json'}],
    ['junit', {outputFile: 'test-results/junit-report.xml'}],
    ['allure-playwright'],
    ['@estruyf/github-actions-reporter', {outputFile: 'test-results/report-gha.log'}],
  
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    //baseURL: 'http://localhost:4200',
    // baseURL: process.env.DEV === '1' ? 'http://localhost:4201' 
    // : process.env.STG === '1' ? 'http://stg:4202' 
    // : process.env.LOCAL === '1' ? 'http://localhost:4200'

    globalUrl : 'https://www.globalsqa.com/demo-site/draganddrop/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    /* by default referes to 'data-testid' can be customised as per user requirement*/
    testIdAttribute: 'data-pw',
    ignoreHTTPSErrors: true,
    video: 
    {
      mode: 'retain-on-failure',
      size: { width: 1080, height: 1080}
    }
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
          baseURL: 'http://dev:4200'
       },
    },
     {
      name: 'stg',
      use: { ...devices['Desktop Chrome'],
          baseURL: 'http://stg:4200'
       },
    },
     {
      name: 'local',
      use: { ...devices['Desktop Chrome'],
          baseURL: 'http://localhost:4200'
       },
    },
     {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] ,
         baseURL: 'https://thinking-tester-contact-list.herokuapp.com' 
        },
      testMatch: 'auth.setup.ts'
      
    },
     {
      name: 'API tests',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] ,
         baseURL: 'https://thinking-tester-contact-list.herokuapp.com' 
        },
      testDir: './tests/api',
      
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use:{
        ...devices['iPhone 14 Pro Max']
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
