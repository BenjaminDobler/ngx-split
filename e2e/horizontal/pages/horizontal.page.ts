import { Locator, Page } from '@playwright/test';

export class HorizontalPage {
  readonly content1: Locator = this.page.getByTestId('content1');
  readonly content2: Locator = this.page.getByTestId('content2');
  readonly dividers: Locator = this.page.locator('.divider')

  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/horizontal');
  }
}
