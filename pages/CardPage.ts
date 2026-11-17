import { Page, Locator, expect } from "@playwright/test";

export class CardPage {
  readonly page: Page;
  readonly novoCardButton: Locator;
  readonly codUsLabel: Locator;
  readonly prioridadeSelector: Locator;
  readonly tituloLabel: Locator;
  readonly descricaoLabel: Locator;
  readonly salvarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.novoCardButton = page.getByTestId("btn-nova-tarefa");
    this.codUsLabel = page.getByTestId("input-codigo-cartao");
    this.prioridadeSelector = page.getByTestId("select-prioridade-cartao");
    this.tituloLabel = page.getByTestId("input-titulo-cartao");
    this.descricaoLabel = page.getByTestId("input-descricao-cartao");
    this.salvarButton = page.getByTestId("btn-salvar-cartao");
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
  async validarCadastradoCard(idCard: string) {
    const cardContainer = this.page.getByTestId(`card-item-${idCard}`);
  }
}
