import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
test.use({ storageState: { cookies: [], origins: [] } });

const userEmail = process.env.USER_EMAIL || '';
const userPassword = process.env.USER_PASSWORD || '';

test('Deve realizar login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectLoginSuccess();
  
});


