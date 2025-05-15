import { Page } from 'playwright';
import { test as base } from '@pw_tests/workerScopeFixtures';
import { HomePage } from '@/web_ui/pages/Home/HomePage';
import { getStealthChromium } from '@/utils/stealthChromium';
import { SearchResultsPage } from '@/web_ui/pages/Search/SearchResultsPage';
import { Price } from '@/web_ui/components/Sidebars/FiltersSidebar';
import { CS_CLEARANCE_COOKIES } from '@/common/constants/cookies.constants';

const chromium = getStealthChromium();

export const test = base.extend<{
  pageWithCookie: Page;
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  testData: {
    query: string;
    paidCourse: {
      name: string;
      price: string;
    };
    freeCourse: {
      name: string;
      price: Price;
    };
  };
}>({
  pageWithCookie: [
    async ({}, use) => {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();

      await context.addCookies(CS_CLEARANCE_COOKIES);

      const page = await context.newPage();

      await use(page);
      await browser.close();
    },
    { scope: 'test' },
  ],
  homePage: [
    async ({ pageWithCookie }, use) => {
      const storePage = new HomePage(pageWithCookie);

      await use(storePage);
    },
    { scope: 'test' },
  ],
  searchResultsPage: [
    async ({ pageWithCookie, testData }, use) => {
      const searchResultsPage = new SearchResultsPage(
        pageWithCookie,
        testData.query,
      );

      await use(searchResultsPage);
    },
    { scope: 'test' },
  ],
  testData: [
    async ({}, use) => {
      const testData = {
        query: 'JavaScript',
        paidCourse: {
          name: 'The Complete JavaScript Course 2025: From Zero to Expert!',
          price: '$22.99',
        },
        freeCourse: {
          name: 'Javascript Essentials',
          price: Price.Free,
        },
      };

      await use(testData);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
