import { test as base } from '@playwright/test';
import { HorizontalPage } from '../pages/horizontal.page';

export const test = base.extend<{ horizontalPage: HorizontalPage }>({
  horizontalPage: async ({ page }, use) => {
    // Setup of the fixture
    const startPage = new HorizontalPage(page);
    await startPage.goto();

    // Use the fixture value in the test
    await use(startPage);

    // Potential teardown of the fixture
    // e.g. await startPage.close();
  },
});

export { expect } from '@playwright/test';
