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

  async editarProjeto(nomeAtual: string, novoNome: string, novaDescricao: string) {
    const projetoContainer = this.page.getByTestId(/project-card-.*/ ).filter({ hasText: nomeAtual });

    const btnHover = projetoContainer.getByTestId(/project-menu-toggle-.*/);
    const btnEdit = projetoContainer.getByTestId(/project-edit-button-.*/);

    await btnHover.click();
    await btnEdit.click();
    await this.nomeProjetoInput.fill(novoNome);
    await this.descricaoProjetoInput.fill(novaDescricao);
    await this.salvarProjetoButton.click();
  }

  async excluirProjeto(nomeProjeto: string){
    const projetoContainer = this.page.getByTestId(/project-card-.*/ ).filter({ hasText: nomeProjeto });

    const btnHover = projetoContainer.getByTestId(/project-menu-toggle-.*/);
    const btnDelete = projetoContainer.getByTestId(/project-delete-button-.*/);

    await btnHover.click();
    await btnDelete.click();

    await this.page.getByRole('button', { name: 'Excluir' }).click();

  }




  
}
