import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export enum Price {
  Free = 'Free',
  Paid = 'Paid',
}

export class FiltersSidebar extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly filterSidebar = this.elementsHelper.getElementByClass(
    'filter-drawer-module--side-drawer',
  );

  private readonly closeButton = this.page.getByTestId('close-btn');

  private readonly getCheckboxByName = (name: string) =>
    this.elementsHelper.getElementByClass('ud-toggle-input-container').filter({
      hasText: name,
    });

  async assertVisible(): Promise<void> {
    await test.step('Assert filters sidebar is visible', async () => {
      await expect(this.filterSidebar).toBeVisible();
    });
  }

  async assertIsNotVisible(): Promise<void> {
    await test.step('Assert filters sidebar is not visible', async () => {
      await expect(this.filterSidebar).toBeHidden();
    });
  }

  async selectPiceCheckbox(name: Price): Promise<void> {
    await test.step(`Select "${name}" checkbox`, async () => {
      await this.getCheckboxByName(name).click();
    });
  }

  async clickCloseSidebarButton(): Promise<void> {
    await test.step('Click close sidebar button', async () => {
      await this.closeButton.click();
    });
  }
}
