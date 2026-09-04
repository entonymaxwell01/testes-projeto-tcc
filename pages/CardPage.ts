import { Page, Locator, expect } from "@playwright/test";

export class CardPage {
  readonly page: Page;
  readonly novoCardButton: Locator;
  readonly codUsLabel: Locator;
  readonly prioridadeSelector: Locator;
  readonly tituloLabel: Locator;
  readonly descricaoLabel: Locator;
  readonly salvarButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.novoCardButton = page.getByTestId("btn-nova-tarefa");
    this.codUsLabel = page.getByTestId("input-codigo-cartao");
    this.prioridadeSelector = page.getByTestId("select-prioridade-cartao");
    this.tituloLabel = page.getByTestId("input-titulo-cartao");
    this.descricaoLabel = page.getByTestId("input-descricao-cartao");
    this.salvarButton = page.getByTestId("btn-salvar-cartao");
    this.errorMessage = page.getByTestId("msg-erro").first();
    this.successMessage = page.getByTestId("msg-sucesso").first();
  }

  async criarCard(
    codUs: string,
    prioridade: string,
    titulo: string,
    descricao: string,
  ) {
    await this.novoCardButton.click();
    await this.codUsLabel.fill(codUs);
    await this.prioridadeSelector.selectOption(prioridade);
    await this.tituloLabel.fill(titulo);
    await this.descricaoLabel.fill(descricao);
    await this.salvarButton.click();
  }

  async expectSuccessMessage(expectedText: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expectedText);
  }

  async expectErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}
