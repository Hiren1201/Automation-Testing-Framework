import { chromium, test, expect } from '@playwright/test';
import { SimpleFormPage } from '../pages/SimpleFormPage.js';
import { DragDropSliderPage } from '../pages/DragDropSliderPage.js';
import { InputFormPage } from '../pages/InputFormPage.js';

const LT_USER = 'divpatel2203@gmail.com';
const LT_KEY = 'LT_mhXoPJkTtOSb8LmfjePFKZ4YrboGOC6QnnwOTDiXsiVZ9tk';

const BROWSERS = [
  { name: 'Chromium-Win10', browserName: 'pw-chromium', browserVersion: '145.0', platform: 'Windows 10' },
  { name: 'WebKit-Win10', browserName: 'pw-webkit', browserVersion: 'latest', platform: 'Windows 10' },
  // { name: 'Firefox-Win10', browserName: 'pw-firefox', browserVersion: 'latest', platform: 'Windows 10' },
];

for (const combo of BROWSERS) {
  test(`[${combo.name}] Assignment`, async () => {
    const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
      browserName: combo.browserName,
      browserVersion: combo.browserVersion,
      'LT:Options': {
        platform: combo.platform,
        build: 'Playwright 101 Assignment',
        name: combo.name,
        user: LT_USER,
        accessKey: LT_KEY,
        console: true, network: true, video: true, screenshot: 'on',
      },
    }))}`;

    const browser = await chromium.connect({ wsEndpoint });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Scenario 1 — Simple Form Demo
      const simpleForm = new SimpleFormPage(page);
      await simpleForm.navigate();
      await simpleForm.enterMessage('Welcome to TestMu AI');
      await simpleForm.clickGetCheckedValue();
      await simpleForm.verifyMessage('Welcome to TestMu AI');

      // Scenario 2 — Drag & Drop Sliders
      const slider = new DragDropSliderPage(page);
      await slider.navigate();
      await slider.setSliderValue('95');
      await slider.verifySliderValue('95');

      // Scenario 3 — Input Form Submit
      const inputForm = new InputFormPage(page);
      await inputForm.navigate();
      await inputForm.clickSubmit();
      await inputForm.verifyValidationError();
      await inputForm.fillForm({
        name: 'Hiren',
        email: 'hirenp915@gmail.com',
        password: '[PASSWORD]',
        company: 'Google',
        website: 'www.google.com',
        country: 'United States',
        city: 'New York',
        address1: '123 Main Street',
        address2: 'Suite 100',
        state: 'New York',
        zipCode: '10001',
      });
      await inputForm.clickSubmit();
      await inputForm.verifySuccessMessage();

    } finally {
      await context.close();
      await browser.close();
    }
  });
}