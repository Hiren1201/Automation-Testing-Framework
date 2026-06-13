import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 240000,
  retries: 0,
  workers: 2,
  reporter: 'html',
});