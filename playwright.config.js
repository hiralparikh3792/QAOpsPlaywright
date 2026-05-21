// @ts-check
import {defineConfig, devices}  from '@playwright/test';
import { trace } from 'node:console';

const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 0,
  // workers: 1, // disabling parallel mechanism when multiple files in project runs parallely by default if we give npx playwright test
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless : false, 
    screenshot: 'only-on-failure', 
    trace: 'on',
    //video: 'retain-on-failure',
    //...devices['iPhone 12'], 
    //viewport : {width:720,height:720}
  
  },

};
module.exports = config;

