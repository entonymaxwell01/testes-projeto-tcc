import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
test.use({ storageState: { cookies: [], origins: [] } });

const userEmail = process.env.USER_EMAIL || '';
const userPassword = process.env.USER_PASSWORD || '';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
    await loginPage.goto();
});

test('Deve realizar login com sucesso', async () => {

  await loginPage.login(userEmail, userPassword);
  await loginPage.expectLoginSuccess();
});

test('Deve falhar ao tentar realizar login com senha invalida', async () => {
  await loginPage.login(userEmail, 'senha-incorreta');
  await loginPage.expectLoginError('Usuário ou senha inválidos.');
});


test('Deve falhar ao tentar realizar login com email invalido', async () => {
  await loginPage.login('email-invalido@email.com', userPassword);
  await loginPage.expectLoginError('Usuário ou senha inválidos.');
});



