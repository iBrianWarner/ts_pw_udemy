import { ROUTES } from '@/web_ui/routes.constants';
import { test, expect, Page } from '@playwright/test';
import { BasePage } from '@/web_ui/pages/BasePage';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { FiltersForm } from '@/web_ui/components/Forms/FiltersForm';
import { FiltersSidebar } from '@/web_ui/components/Sidebars/FiltersSidebar';
import { CourseCard } from '@/web_ui/components/Courses/CourseCard';

export class SearchResultsPage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  public readonly filtersForm = new FiltersForm(this.page);

  public readonly filtersSidebar = new FiltersSidebar(this.page);

  public readonly courseCard = new CourseCard(this.page);

  constructor(page: Page, query: string) {
    super(page);

    this.url = ROUTES.searchResults(query);
  }

  async assertCartItemIsVisible(name: string): Promise<void> {
    await test.step(`Assert "${name}" cart item is visible`, async () => {
      await expect(this.elementsHelper.getButtonByName('test')).toBeVisible();
    });
  }
}
