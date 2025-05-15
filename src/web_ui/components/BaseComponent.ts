import { test, Locator, Page } from '@playwright/test';

export class BaseComponent {
  public readonly page: Page;

  public readonly getByDataTestId = (testId: string): Locator => {
    return this.page.locator(`[data-testid="${testId}"]`);
  };

  constructor(page: Page) {
    this.page = page;
  }

  async pressKeyboardEnter(delay = 0): Promise<void> {
    await test.step('Press [Enter]', async () => {
      await this.page.keyboard.press('Enter', { delay });
    });
  }
}
