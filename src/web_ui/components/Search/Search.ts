import { test, Locator } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class Search extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly searchField = this.getByDataTestId('search-input');

  private readonly getSearchResult = (searchText: string): Locator =>
    this.getByDataTestId('result-with-image').filter({
      hasText: searchText,
    });

  async fillSearchField(searchText: string, delay = 200): Promise<void> {
    await test.step('Fill search field', async () => {
      await this.searchField.pressSequentially(searchText, { delay });
    });
  }

  async clickOnSearchResult(searchText: string): Promise<void> {
    await test.step('Click on search result', async () => {
      await this.getSearchResult(searchText).click();
    });
  }

  async waitForSearchResult(searchText: string): Promise<void> {
    await test.step('Wait for search result', async () => {
      await this.getSearchResult(searchText).waitFor();
    });
  }

  async searchForCourseAndPressEnter(searchText: string): Promise<void> {
    await test.step(`Search for course ${searchText} and press Enter`, async () => {
      await this.fillSearchField(searchText);
      await this.pressKeyboardEnter();
    });
  }

  async searchForCourseAndClickOnResult(searchText: string): Promise<void> {
    await test.step(`Search for course ${searchText} and click on result`, async () => {
      await this.fillSearchField(searchText);
      await this.waitForSearchResult(searchText);
      await this.clickOnSearchResult(searchText);
    });
  }
}
