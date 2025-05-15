import { CoursePage } from '@/web_ui/pages/Course/CoursePage';
import { test } from '@pw_tests/testScopeFixtures';

test.describe('Course page', () => {
  let coursePage: CoursePage;

  test('should provide ability to observe course details and add it to cart', async ({
    searchResultsPage,
    testData: { paidCourse },
  }) => {
    await searchResultsPage.visit();
    await searchResultsPage.courseCard.clickOnCourseCard(paidCourse.name);

    const coursePagePromise =
      await searchResultsPage.getNewPageOpenedInNewTab();

    coursePage = new CoursePage(
      coursePagePromise,
      'the-complete-javascript-course',
    );
    await coursePage.assertOpenedInNewTab();
    await coursePage.assertCourseTitle(paidCourse.name);
  });
});
