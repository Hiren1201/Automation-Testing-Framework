import { expect } from '@playwright/test';

export class DragDropSliderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.slider = page.locator('.sp__range-success input[type="range"]');
    this.rangeOutput = page.locator('#rangeSuccess');
  }

  async navigate() {
    await this.page.goto('https://www.testmuai.com/selenium-playground/');
    await this.page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
    await this.page.waitForTimeout(1000);
  }

  async setSliderValue(value) {
    const sliderBB = await this.slider.boundingBox();
    if (!sliderBB) throw new Error('Slider not found');

    // Calculate the x-position for the target value (range 1-100)
    const targetX = sliderBB.x + (sliderBB.width * (Number(value) - 1)) / 99;
    const centerY = sliderBB.y + sliderBB.height / 2;

    // Click at the calculated position to move the slider
    await this.page.mouse.click(targetX, centerY);
    await this.page.waitForTimeout(300);

    // Verify and fine-tune if needed via evaluate
    const currentVal = await this.rangeOutput.textContent();
    if (currentVal !== value) {
      await this.slider.evaluate((el, val) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeSetter.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
    }
  }

  async verifySliderValue(expectedValue) {
    await expect(this.rangeOutput).toHaveText(expectedValue);
  }
}
