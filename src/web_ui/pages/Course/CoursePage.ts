import { ROUTES } from '@/web_ui/routes.constants';
import { test, expect, Page } from '@playwright/test';
import { BasePage } from '@/web_ui/pages/BasePage';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class CoursePage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly courseTitle = this.page.getByTestId('lead-title');

  constructor(page: Page, courseSlug: string) {
    super(page);

    this.url = ROUTES.course(courseSlug);
  }

  async assertCourseTitle(name: string): Promise<void> {
    await test.step(`Assert "${name}" course title`, async () => {
      await expect(this.courseTitle).toContainText(name);
    });
  }
}
