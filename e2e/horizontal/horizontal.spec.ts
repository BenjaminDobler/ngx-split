import { test, expect } from './fixtures/horizontal.fixture';
import { HorizontalPage } from './pages/horizontal.page';

test.describe('horizontal splitting', () => {
  test('should correctly layout children horizontally', async ({
    horizontalPage,
  }) => {
    await horizontalPage.goto();
    const dividercount = await horizontalPage.dividers.count();
    expect(dividercount).toBe(1);
  });

  test('conent children should have the correct size', async ({
    horizontalPage,
  }) => {
    await horizontalPage.goto();
    const content1BoundingBox = await horizontalPage.content1.boundingBox();
    expect(content1BoundingBox?.width).toBe(100);
  });
});
