import { test as setup } from "../../fixtures/page-fixtures";
import { expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import "dotenv/config";

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");

// setup("authenticate via UI", async ({ loginPage, page, request }) => {
//   const apiUrl = process.env.API_URL || "http://localhost:3001";
//   const resetToken = process.env.QA_RESET_TOKEN;
//   if (!resetToken) {
//     throw new Error(
//       "❌ A variável QA_RESET_TOKEN não foi definida no arquivo .env ou no GitHub Secrets!",
//     );
//   }
//   await request.post(`${apiUrl}/qa/reset-db`, {
//     headers: {
//       "x-qa-reset-token": resetToken,
//     },
//   });

//   await loginPage.goto();
//   await loginPage.login(
//     process.env.USER_EMAIL as string,
//     process.env.USER_PASSWORD as string,
//   );

//   await loginPage.expectLoginSuccess();

//   await page.context().storageState({ path: authFile });
// });

setup("authenticate via API", async ({ request, page }) => {
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

  const res = await request.post(`${apiUrl}/login`, {
    data: {
      email: process.env.USER_EMAIL,
      senha: process.env.USER_PASSWORD,
    },
  });

  await expect(res.ok()).toBeTruthy();
  const { token, usuario } = await res.json();

  const storageData = {
    cookies: [],
    origins: [
      {
        origin: process.env.BASE_URL || "http://localhost:5173",
        localStorage: [
          { name: "@TCC:token", value: token },
          { name: "@TCC:usuario", value: JSON.stringify(usuario) },
        ],
      },
    ],
  };
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  fs.writeFileSync(authFile, JSON.stringify(storageData, null, 2));
});
