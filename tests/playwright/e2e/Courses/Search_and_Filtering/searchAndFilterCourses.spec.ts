import { test } from '@pw_tests/testScopeFixtures';

test.describe('Udemy platform', () => {
  test('should provide ability to search for course and filter results', async ({
    homePage,
    searchResultsPage,
    testData: { query, freeCourse },
  }) => {
    await homePage.visit();
    await homePage.search.searchForCourseAndPressEnter(query);
    await searchResultsPage.assertOpened();

    await searchResultsPage.courseCard.assertMostRelevantCourseIsNotFree();
    await searchResultsPage.filtersForm.assertVisible();
    await searchResultsPage.filtersForm.clickAllFiltersButton();
    await searchResultsPage.filtersSidebar.selectPiceCheckbox(freeCourse.price);
    await searchResultsPage.filtersSidebar.clickCloseSidebarButton();
    await searchResultsPage.filtersSidebar.assertIsNotVisible();

    await searchResultsPage.courseCard.assertMostRelevantCourseIsFree();
    await searchResultsPage.courseCard.assertPaidCourseIsNotVisible();
  });
});
