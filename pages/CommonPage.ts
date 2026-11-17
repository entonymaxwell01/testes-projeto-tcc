import { Page, Locator, expect } from "@playwright/test";

export class CommonPage {
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly popupMSG: Locator;

  constructor(page: Page) {
    this.errorMessage = page.getByTestId("msg-erro").first();
    this.successMessage = page.getByTestId("msg-sucesso").first();
    this.popupMSG = page.locator('div[role="status"]').first();
  }

  async expectSuccessMessage(expectedText: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expectedText);
  }

  async expectErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  async expectPopupMessage(expectedText: string) {
    await expect(this.popupMSG).toBeVisible();
    await expect(this.popupMSG).toContainText(expectedText);
  }
}
