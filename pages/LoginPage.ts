import { Page, Locator, expect } from '@playwright/test';


export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginText: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    // O Playwright tem um método nativo e mais limpo para data-testid:
    this.emailInput = page.getByTestId('input-email');
    this.passwordInput = page.getByTestId('input-senha');
    this.loginButton = page.getByTestId('btn-login');
    this.loginText = page.getByText('TestBoard');
    this.errorMessage = page.getByTestId('msg-erro'); 
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


  async expectLoginSuccess() {
    await this.page.waitForURL('/');
    await expect(this.loginText).toBeVisible();
  }

  async expectLoginError(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}
