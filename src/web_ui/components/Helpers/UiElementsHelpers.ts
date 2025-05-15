import { Page, Locator } from '@playwright/test';

export class UiElementsHelper {
  constructor(private page: Page) {}

  public getElementByClass(elementClass: string): Locator {
    return this.page.locator(`[class*="${elementClass}"]`);
  }

  public getElementById(elementId: string): Locator {
    return this.page.locator(`#${elementId}`);
  }

  public getButtonByName(name: string): Locator {
    return this.page.getByRole('button', { name });
  }
}
