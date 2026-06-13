import { expect } from '@playwright/test';

export class SimpleFormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.messageInput = page.getByRole('textbox', { name: 'Please enter your Message' });
    this.getCheckedValueBtn = page.getByRole('button', { name: 'Get Checked Value' });
    this.messageOutput = page.locator('#message');
  }

  async navigate() {
    await this.page.goto('https://www.testmuai.com/selenium-playground/');
    await this.page.getByRole('link', { name: 'Simple Form Demo' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page).toHaveURL(/simple-form-demo/);
  }


  async enterMessage(text) {
    await this.messageInput.click();
    await this.messageInput.fill(text);
    await this.messageInput.press('Tab');
  }

  async clickGetCheckedValue() {
    await this.getCheckedValueBtn.click();
  }

  async verifyMessage(expectedText) {
    await expect(this.messageOutput).toHaveText(expectedText);
  }
}
