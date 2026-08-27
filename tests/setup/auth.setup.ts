import { test as setup } from '@playwright/test';
import path from 'path';
import 'dotenv/config';
import { LoginPage } from '../../pages/LoginPage';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate via UI', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
  

  await loginPage.expectLoginSuccess();

  await page.context().storageState({ path: authFile });
});
