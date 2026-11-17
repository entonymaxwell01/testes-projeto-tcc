import { test } from "../../fixtures/page-fixtures";
import cenariosDeFalha from "../..//data/login-errors.json";
test.use({ storageState: { cookies: [], origins: [] } });

const userEmail = process.env.USER_EMAIL || "";
const userPassword = process.env.USER_PASSWORD || "";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test("Deve realizar login com sucesso", async ({ loginPage }) => {
  await loginPage.login(userEmail, userPassword);
  await loginPage.expectLoginSuccess();
});

test.describe("Testes de login com falha", () => {
  for (const cenario of cenariosDeFalha) {
    test(`Deve falhar ao tentar realizar login com ${cenario.descricao}`, async ({
      loginPage,
    }) => {
      const email = cenario.email.replace("{{USER_EMAIL}}", userEmail);

      await loginPage.login(email, cenario.senha);
      await loginPage.expectLoginError(cenario.mensagemEsperada);
    });
  }
});
