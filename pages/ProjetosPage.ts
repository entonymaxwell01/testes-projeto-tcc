import { Page, Locator, expect } from '@playwright/test';



export class ProjetosPage {
  readonly page: Page;
  readonly novoProjetoButton: Locator;
  readonly nomeProjetoInput: Locator;
  readonly descricaoProjetoInput: Locator;
  readonly salvarProjetoButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.novoProjetoButton = page.getByTestId('new-project-button');
    this.nomeProjetoInput = page.getByTestId('project-name-input');
    this.descricaoProjetoInput = page.getByTestId('project-desc-input');
    this.salvarProjetoButton = page.getByTestId('modal-submit-button');
    this.errorMessage = page.getByTestId('msg-erro').first();  
    this.successMessage = page.getByTestId('msg-sucesso').first();  

  
  }

  async goto() {
    await this.page.goto('/projetos');
  }

  async cadastrarNovoProjeto(nome: string, descricao: string) {
    await this.novoProjetoButton.click();
    await this.nomeProjetoInput.fill(nome);
    await this.descricaoProjetoInput.fill(descricao);
    await this.salvarProjetoButton.click();

  }

  async expectSuccessMessage(expectedText: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expectedText);
  }

  async expectErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }




  
}
