import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { Price } from '@/web_ui/components/Sidebars/FiltersSidebar';

export class CourseCard extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly getCourseCardByName = (name: string) =>
    this.elementsHelper
      .getElementByClass('vertical-card-module--card')
      .filter({ hasText: name });

  private readonly getCoursePriceByCourseName = (name: string) =>
    this.getCourseCardByName(name).getByTestId('course-price-text');

  private readonly coursePriceText = this.page
    .getByTestId('course-price-text')
    .first();

  async assertCourseIsVisible(courseName: string): Promise<void> {
    await test.step('Assert course is visible', async () => {
      await expect(this.getCourseCardByName(courseName)).toBeVisible();
    });
  }

  async assertCourseIsNotVisible(courseName: string): Promise<void> {
    await test.step('Assert course is not visible', async () => {
      await expect(this.getCourseCardByName(courseName)).toBeHidden();
    });
  }

  async assertCoursePrice(options: {
    courseName: string;
    price: Price | string;
  }): Promise<void> {
    await test.step('Assert course price', async () => {
      const { courseName, price } = options;
      const course = this.getCourseCardByName(courseName);

      await expect(course).toContainText(price);
    });
  }

  async assertMostRelevantCourseIsFree(): Promise<void> {
    await test.step('Assert most relevant course is free', async () => {
      await expect(this.coursePriceText).toContainText(Price.Free);
    });
  }

  async assertMostRelevantCourseIsNotFree(): Promise<void> {
    await test.step('Assert most relevant course is not free', async () => {
      const numberRegexp = /\$\d+/;

      await expect(this.coursePriceText).toContainText(numberRegexp);
    });
  }

  async assertPaidCourseIsNotVisible(): Promise<void> {
    await test.step('Assert paid course is not visible', async () => {
      const numberRegexp = /\$\d+/;
      const coursePrice = this.coursePriceText.filter({
        hasText: numberRegexp,
      });

      await expect(coursePrice).toBeHidden();
    });
  }

  async clickOnCourseCard(courseName: string): Promise<void> {
    await test.step('Click on course card', async () => {
      const courseCard = this.getCourseCardByName(courseName);

      await courseCard.click();
    });
  }
}
