# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: setup/auth.setup.ts >> authenticate via API
- Location: tests/setup/auth.setup.ts:34:6

# Error details

```
Error: ENOENT: no such file or directory, open '/home/runner/work/testes-projeto-tcc/testes-projeto-tcc/qa-automation/playwright/.auth/user.json'
```

# Test source

```ts
  1  | import { test as setup } from "../../fixtures/page-fixtures";
  2  | import { expect } from "@playwright/test";
  3  | import fs from "fs";
  4  | import path from "path";
  5  | import "dotenv/config";
  6  | 
  7  | const authFile = path.join(__dirname, "../../playwright/.auth/user.json");
  8  | 
  9  | // setup("authenticate via UI", async ({ loginPage, page, request }) => {
  10 | //   const apiUrl = process.env.API_URL || "http://localhost:3001";
  11 | //   const resetToken = process.env.QA_RESET_TOKEN;
  12 | //   if (!resetToken) {
  13 | //     throw new Error(
  14 | //       "❌ A variável QA_RESET_TOKEN não foi definida no arquivo .env ou no GitHub Secrets!",
  15 | //     );
  16 | //   }
  17 | //   await request.post(`${apiUrl}/qa/reset-db`, {
  18 | //     headers: {
  19 | //       "x-qa-reset-token": resetToken,
  20 | //     },
  21 | //   });
  22 | 
  23 | //   await loginPage.goto();
  24 | //   await loginPage.login(
  25 | //     process.env.USER_EMAIL as string,
  26 | //     process.env.USER_PASSWORD as string,
  27 | //   );
  28 | 
  29 | //   await loginPage.expectLoginSuccess();
  30 | 
  31 | //   await page.context().storageState({ path: authFile });
  32 | // });
  33 | 
  34 | setup("authenticate via API", async ({ request, page }) => {
  35 |   const apiUrl = process.env.API_URL || "http://localhost:3001";
  36 |   const resetToken = process.env.QA_RESET_TOKEN;
  37 |   if (!resetToken) {
  38 |     throw new Error(
  39 |       "❌ A variável QA_RESET_TOKEN não foi definida no arquivo .env ou no GitHub Secrets!",
  40 |     );
  41 |   }
  42 |   await request.post(`${apiUrl}/qa/reset-db`, {
  43 |     headers: {
  44 |       "x-qa-reset-token": resetToken,
  45 |     },
  46 |   });
  47 | 
  48 |   const res = await request.post(`${apiUrl}/login`, {
  49 |     data: {
  50 |       email: process.env.USER_EMAIL,
  51 |       senha: process.env.USER_PASSWORD,
  52 |     },
  53 |   });
  54 | 
  55 |   await expect(res.ok()).toBeTruthy();
  56 |   const { token, usuario } = await res.json();
  57 | 
  58 |   const storageData = {
  59 |     cookies: [],
  60 |     origins: [
  61 |       {
  62 |         origin: process.env.BASE_URL || "http://localhost:5173",
  63 |         localStorage: [
  64 |           { name: "@TCC:token", value: token },
  65 |           { name: "@TCC:usuario", value: JSON.stringify(usuario) },
  66 |         ],
  67 |       },
  68 |     ],
  69 |   };
> 70 |   fs.writeFileSync(authFile, JSON.stringify(storageData, null, 2));
     |      ^ Error: ENOENT: no such file or directory, open '/home/runner/work/testes-projeto-tcc/testes-projeto-tcc/qa-automation/playwright/.auth/user.json'
  71 | });
  72 | 
```