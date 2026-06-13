import { expect } from '@playwright/test';

export class InputFormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.companyInput = page.getByRole('textbox', { name: 'Company' });
    this.websiteInput = page.getByRole('textbox', { name: 'Website' });
    this.countryDropdown = page.getByRole('combobox');
    this.cityInput = page.locator('#inputCity');
    this.address1Input = page.getByRole('textbox', { name: 'Address 1' });
    this.address2Input = page.getByRole('textbox', { name: 'Address 2' });
    this.stateInput = page.locator('#inputState');
    this.zipCodeInput = page.getByRole('textbox', { name: 'Zip Code*' });
    this.successMessage = page.getByText('Thanks for contacting us, we');
  }

  async navigate() {
    await this.page.goto('https://www.testmuai.com/selenium-playground/');
    await this.page.getByRole('link', { name: 'Input Form Submit' }).click();
    await this.page.waitForTimeout(1000);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async verifyValidationError() {
    await expect(this.page.locator('input:invalid').first()).toBeAttached();
  }

  async fillForm({ name, email, password, company, website, country, city, address1, address2, state, zipCode }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.companyInput.fill(company);
    await this.websiteInput.fill(website);
    await this.countryDropdown.selectOption({ label: country });
    await this.cityInput.fill(city);
    await this.address1Input.fill(address1);
    await this.address2Input.fill(address2);
    await this.stateInput.fill(state);
    await this.zipCodeInput.fill(zipCode);
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }
}
