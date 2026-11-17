import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import { test } from "../../fixtures/page-fixtures";
import { expect } from "@playwright/test";

test.describe("Testes de acessibilidade", async () => {
  test("Deve atender as diretrizes de acessibilidade da tela de login", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();

    const scanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    createHtmlReport({
      results: scanResults,
      options: {
        outputDir: "a11y-reports",
        reportFileName: "login-acessibilidade.html",
      },
    });

    expect(scanResults.violations).toEqual([]);
  });

  test("Deve atender as diretrizes de acessibilidade da tela de projetos", async ({
    page,
    projetosPage,
  }) => {
    await projetosPage.goto();

    const scanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    createHtmlReport({
      results: scanResults,
      options: {
        outputDir: "a11y-reports",
        reportFileName: "projetos-acessibilidade.html",
      },
    });

    expect(scanResults.violations).toEqual([]);
  });
});
