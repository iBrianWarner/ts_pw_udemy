import { PwProjectName } from '@/common/allure/allure.typedefs';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

const envFilesPath = './environment';
const envType = process.env.ENV_TYPE || '';
const isCi = envType === 'ci';

if (fs.existsSync(`${envFilesPath}/.env.${process.env.ENV_TYPE}`)) {
  dotenv.config({
    path: `${envFilesPath}/.env.${process.env.ENV_TYPE}`,
  });
} else {
  throw new Error(`
Missing config file ${envFilesPath}/.env.${process.env.ENV_TYPE}, create from sample if available.
`);
}

export default defineConfig({
  timeout: isCi ? 60000 : 30000,
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: isCi ? 1 : 0,
  workers: isCi ? 3 : 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-purpose',
  },
  expect: { timeout: 10000 },
  projects: [
    {
      name: PwProjectName.Chromium,
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/mobile.spec.ts/],
    },
  ],
});
