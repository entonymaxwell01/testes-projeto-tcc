# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/acessibility.spec.ts >> Testes de acessibilidade >> Deve atender as diretrizes de acessibilidade da tela de login
- Location: tests/e2e/acessibility.spec.ts:7:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#06b6a4",
+               "contrastRatio": 2.55,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ffffff",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.55 (foreground color: #ffffff, background color: #06b6a4, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<button data-testid=\"btn-login\" type=\"submit\" class=\"h-10 w-full bg-[#06b6a4] hover:bg-[#059688] text-white font-medium text-sm rounded-md transition-colors flex items-center justify-center\">Entrar na conta</button>",
+                 "target": Array [
+                   "button",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #ffffff, background color: #06b6a4, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<button data-testid=\"btn-login\" type=\"submit\" class=\"h-10 w-full bg-[#06b6a4] hover:bg-[#059688] text-white font-medium text-sm rounded-md transition-colors flex items-center justify-center\">Entrar na conta</button>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]:
    - img "Background" [ref=f1e5]
    - generic [ref=f1e7]: TestBoard
    - generic [ref=f1e14]:
      - generic [ref=f1e15]: "\"A ferramenta ideal para centralizar nossos casos de teste e acompanhar o progresso das validações em tempo real.\""
      - generic [ref=f1e16]: Projeto de TCC - Engenharia de Software
  - generic [ref=f1e18]:
    - generic [ref=f1e19]:
      - heading "Bem-vindo de volta" [level=1] [ref=f1e20]
      - paragraph [ref=f1e21]: Insira suas credenciais para acessar o sistema
    - generic [ref=f1e22]:
      - generic [ref=f1e23]:
        - generic [ref=f1e24]: E-mail
        - textbox "exemplo@email.com" [ref=f1e25]
      - generic [ref=f1e26]:
        - generic [ref=f1e27]:
          - generic [ref=f1e28]: Senha
          - link "Esqueceu a senha?" [ref=f1e29] [cursor=pointer]:
            - /url: "#"
        - textbox "••••••••" [ref=f1e30]
      - button "Entrar na conta" [ref=f1e31]
    - generic [ref=f1e32]:
      - text: Não tem uma conta?
      - link "Cadastre-se" [ref=f1e33] [cursor=pointer]:
        - /url: /cadastro
```

# Test source

```ts
  1  | import AxeBuilder from "@axe-core/playwright";
  2  | import { createHtmlReport } from "axe-html-reporter";
  3  | import { test } from "../../fixtures/page-fixtures";
  4  | import { expect } from "@playwright/test";
  5  | 
  6  | test.describe("Testes de acessibilidade", async () => {
  7  |   test("Deve atender as diretrizes de acessibilidade da tela de login", async ({
  8  |     page,
  9  |     loginPage,
  10 |   }) => {
  11 |     await loginPage.goto();
  12 | 
  13 |     const scanResults = await new AxeBuilder({ page })
  14 |       .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  15 |       .analyze();
  16 | 
  17 |     createHtmlReport({
  18 |       results: scanResults,
  19 |       options: {
  20 |         outputDir: "a11y-reports",
  21 |         reportFileName: "login-acessibilidade.html",
  22 |       },
  23 |     });
  24 | 
> 25 |     expect(scanResults.violations).toEqual([]);
     |                                    ^ Error: expect(received).toEqual(expected) // deep equality
  26 |   });
  27 | 
  28 |   test("Deve atender as diretrizes de acessibilidade da tela de projetos", async ({
  29 |     page,
  30 |     projetosPage,
  31 |   }) => {
  32 |     await projetosPage.goto();
  33 | 
  34 |     const scanResults = await new AxeBuilder({ page })
  35 |       .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  36 |       .analyze();
  37 | 
  38 |     createHtmlReport({
  39 |       results: scanResults,
  40 |       options: {
  41 |         outputDir: "a11y-reports",
  42 |         reportFileName: "projetos-acessibilidade.html",
  43 |       },
  44 |     });
  45 | 
  46 |     expect(scanResults.violations).toEqual([]);
  47 |   });
  48 | });
  49 | 
```