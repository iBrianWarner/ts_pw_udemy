/* eslint-disable playwright/no-conditional-in-test */
import { expect, Page, test } from '@playwright/test';
import { Search } from '@/web_ui/components/Search/Search';

export abstract class BasePage {
  abstract url: string;

  public readonly page: Page;

  public readonly search: Search;

  public readonly getByDataTestId = (testId: string): string => {
    return `[data-testid="${testId}"]`;
  };

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(this.page);
  }

  get pageName(): string {
    return this.constructor.name.replace('Page', '');
  }

  private generateUrlWithParameters(
    url: string,
    parameters: Record<string, string>,
  ): string {
    let newUrl = `${url}?`;

    newUrl += Object.keys(parameters).map(key => `${key}=${parameters[key]}&`);

    return newUrl.slice(0, -1).replace(',', '');
  }

  async goto(url?: string): Promise<void> {
    await test.step(`Go to ${this.pageName} page`, async () => {
      await this.page.goto(url || this.url);
    });
  }

  async visit(url?: string): Promise<void> {
    await test.step(`Visit ${this.pageName} page`, async () => {
      await this.goto(url || this.url);
      await this.assertOpened(url || this.url);
    });
  }

  async assertOpened(
    url?: string | RegExp,
    parameters?: Record<string, string>,
  ): Promise<void> {
    await test.step(`Assert ${this.pageName} page url is correct`, async () => {
      let urlToAssert = url ?? this.url;

      if (parameters && typeof urlToAssert === 'string') {
        urlToAssert = this.generateUrlWithParameters(urlToAssert, parameters);
      }

      await this.page.waitForURL(urlToAssert, { waitUntil: 'commit' });
      await expect(this.page).toHaveURL(urlToAssert ?? this.url);
    });
  }

  async getNewPageOpenedInNewTab(): Promise<Page> {
    return await test.step('Get new Page instance opened in new tab', async () => {
      const newPageInNewTabPromise = this.page.waitForEvent('popup');

      return await newPageInNewTabPromise;
    });
  }

  async assertOpenedInNewTab(
    url?: string,
    parameters?: Record<string, string>,
  ): Promise<void> {
    await test.step(`Assert ${this.pageName} page url is correct`, async () => {
      let urlToAssert = `${url ?? this.url}`;

      if (parameters) {
        urlToAssert = this.generateUrlWithParameters(urlToAssert, parameters);
      }

      const pageInNewTabPromise = this.page.waitForEvent('popup');
      const pageInNewTab = await pageInNewTabPromise;

      await pageInNewTab.waitForURL(urlToAssert, { waitUntil: 'commit' });
      await expect(pageInNewTab).toHaveURL(urlToAssert ?? this.url);
    });
  }
}
