import { test as setup } from "../../fixtures/page-fixtures";
import path from "path";
import "dotenv/config";

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");

setup("authenticate via UI", async ({ loginPage, page, request }) => {
  const apiUrl = process.env.API_URL || "http://localhost:3001";
  const resetToken = process.env.QA_RESET_TOKEN;
  if (!resetToken) {
    throw new Error(
      "❌ A variável QA_RESET_TOKEN não foi definida no arquivo .env ou no GitHub Secrets!",
    );
  }
  await request.post(`${apiUrl}/qa/reset-db`, {
    headers: {
      "x-qa-reset-token": resetToken,
    },
  });

  await loginPage.goto();
  await loginPage.login(
    process.env.USER_EMAIL as string,
    process.env.USER_PASSWORD as string,
  );

  await loginPage.expectLoginSuccess();

  await page.context().storageState({ path: authFile });
});
