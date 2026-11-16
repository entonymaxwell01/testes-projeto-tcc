import { test } from "../../fixtures/page-fixtures";
test.use({ storageState: { cookies: [], origins: [] } });

const userEmail = process.env.USER_EMAIL || "";
const userPassword = process.env.USER_PASSWORD || "";

test("Deve realizar login com sucesso", async ({ loginPage }) => {
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectLoginSuccess();
});

test("Deve falhar ao tentar realizar login com senha invalida", async ({
  loginPage,
}) => {
  await loginPage.login(userEmail, "senha-incorreta");
  await loginPage.expectLoginError("Usuário ou senha inválidos.");
});

test("Deve falhar ao tentar realizar login com email invalido", async ({
  loginPage,
}) => {
  await loginPage.login("email-invalido@email.com", userPassword);
  await loginPage.expectLoginError("Usuário ou senha inválidos.");
});

test("Deve falhar ao tentar realizar login com campos campos vazios", async ({
  loginPage,
}) => {
  await loginPage.login("", "");
  await loginPage.expectLoginError("Preencha todos os campos obrigatórios.");
});
