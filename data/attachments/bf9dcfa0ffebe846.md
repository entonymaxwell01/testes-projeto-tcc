# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/acessibility.spec.ts >> Testes de acessibilidade >> Deve atender as diretrizes de acessibilidade da tela de projetos
- Location: tests/e2e/acessibility.spec.ts:28:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 291

- Array []
+ Array [
+   Object {
+     "description": "Ensure buttons have discernible text",
+     "help": "Buttons must have discernible text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/button-name?application=playwright",
+     "id": "button-name",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "button-has-visible-text",
+             "impact": "critical",
+             "message": "Element does not have inner text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "critical",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "critical",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "critical",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "implicit-label",
+             "impact": "critical",
+             "message": "Element does not have an implicit (wrapped) <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "explicit-label",
+             "impact": "critical",
+             "message": "Element does not have an explicit <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "presentational-role",
+             "impact": "critical",
+             "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element does not have inner text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute
+   Element does not have an implicit (wrapped) <label>
+   Element does not have an explicit <label>
+   Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+         "html": "<button class=\"w-9 h-9 flex items-center justify-center rounded-md border border-black/10 text-[#0f1724] hover:bg-black/5 transition-colors\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".w-9.border-black\\/10.hover\\:bg-black\\/5",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.name-role-value",
+       "wcag2a",
+       "wcag412",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT6.a",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-11.9.1",
+     ],
+   },
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
+               "bgColor": "#f1f8f7",
+               "contrastRatio": 4.49,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b7280",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.49 (foreground color: #6b7280, background color: #f1f8f7, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<nav class=\"w-[260px] bg-[#f1f8f7] border-r border-black/5 flex flex-col shrink-0\">",
+                 "target": Array [
+                   "nav",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.49 (foreground color: #6b7280, background color: #f1f8f7, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-3 mb-2\">Menu Principal</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".uppercase",
+         ],
+       },
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
+                 "html": "<div class=\"flex items-center gap-3 px-3 py-2 rounded-md bg-[#06b6a4] text-white font-medium text-sm cursor-pointer shadow-sm\">",
+                 "target": Array [
+                   ".cursor-pointer",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #ffffff, background color: #06b6a4, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"flex items-center gap-3 px-3 py-2 rounded-md bg-[#06b6a4] text-white font-medium text-sm cursor-pointer shadow-sm\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".cursor-pointer",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f1f8f7",
+               "contrastRatio": 4.49,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b7280",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.49 (foreground color: #6b7280, background color: #f1f8f7, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<nav class=\"w-[260px] bg-[#f1f8f7] border-r border-black/5 flex flex-col shrink-0\">",
+                 "target": Array [
+                   "nav",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.49 (foreground color: #6b7280, background color: #f1f8f7, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-xs text-[#6b7280] truncate\">Eng. de Qualidade</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-xs.truncate.text-\\[\\#6b7280\\]",
+         ],
+       },
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
+                 "html": "<button class=\"h-9 flex items-center gap-2 px-4 bg-[#06b6a4] hover:bg-[#059688] text-white rounded-md text-sm font-medium transition-colors shadow-sm\" data-testid=\"new-project-button\">",
+                 "target": Array [
+                   "button[data-testid=\"new-project-button\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #ffffff, background color: #06b6a4, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<button class=\"h-9 flex items-center gap-2 px-4 bg-[#06b6a4] hover:bg-[#059688] text-white rounded-md text-sm font-medium transition-colors shadow-sm\" data-testid=\"new-project-button\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[data-testid=\"new-project-button\"]",
+         ],
+       },
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
+                 "html": "<button class=\"bg-[#06b6a4] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-[#059688]\" data-testid=\"empty-state-new-project-button\">Criar Primeiro Projeto</button>",
+                 "target": Array [
+                   "button[data-testid=\"empty-state-new-project-button\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #ffffff, background color: #06b6a4, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<button class=\"bg-[#06b6a4] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-[#059688]\" data-testid=\"empty-state-new-project-button\">Criar Primeiro Projeto</button>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[data-testid=\"empty-state-new-project-button\"]",
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
  - navigation [ref=f1e4]:
    - generic [ref=f1e5]: TestBoard
    - generic [ref=f1e15]:
      - generic [ref=f1e16]: Menu Principal
      - generic [ref=f1e17] [cursor=pointer]: Projetos
    - button "U Usuário QA Padrão Eng. de Qualidade" [ref=f1e21]:
      - generic [ref=f1e22]: U
      - generic [ref=f1e23]:
        - generic [ref=f1e24]: Usuário QA Padrão
        - generic [ref=f1e25]: Eng. de Qualidade
  - main [ref=f1e29]:
    - generic [ref=f1e30]:
      - textbox "Buscar projetos..." [ref=f1e35]
      - generic [ref=f1e36]:
        - button [ref=f1e37]
        - button "Novo Projeto" [ref=f1e41]
    - generic [ref=f1e43]:
      - heading "Projetos" [level=1] [ref=f1e44]
      - paragraph [ref=f1e45]: Gerencie os projetos e acompanhe o progresso geral dos testes.
      - generic [ref=f1e46]:
        - heading "Nenhum projeto encontrado" [level=3] [ref=f1e50]
        - paragraph [ref=f1e51]: Ainda não tem projetos.
        - button "Criar Primeiro Projeto" [ref=f1e52]
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
  25 |     expect(scanResults.violations).toEqual([]);
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
> 46 |     expect(scanResults.violations).toEqual([]);
     |                                    ^ Error: expect(received).toEqual(expected) // deep equality
  47 |   });
  48 | });
  49 | 
```