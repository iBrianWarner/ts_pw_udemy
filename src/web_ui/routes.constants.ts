export const ROUTES = {
  home: '/',
  searchResults: (query: string): string =>
    `courses/search/?src=ukw&q=${query}`,
  course: (courseSlug: string): string => `/course/${courseSlug}`,
};
