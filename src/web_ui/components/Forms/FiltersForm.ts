import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';

export class FiltersForm extends BaseComponent {
  private readonly filtersForm = this.getByDataTestId('filters-form');

  private readonly allFiltersButton = this.filtersForm.getByRole('button', {
    name: 'All filters',
  });

  async assertVisible(): Promise<void> {
    await test.step('Assert filters form is visible', async () => {
      await expect(this.filtersForm).toBeVisible();
    });
  }

  async clickAllFiltersButton(): Promise<void> {
    await test.step('Click on "All filters" button', async () => {
      await this.allFiltersButton.click();
    });
  }
}
