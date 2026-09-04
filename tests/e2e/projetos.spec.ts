import { test } from '@playwright/test';
import { ProjetosPage } from '../../pages/ProjetosPage';
import { faker } from '@faker-js/faker/locale/pt_BR';


let projetosPage: ProjetosPage;


test.beforeEach(async ({ page }) => {
    projetosPage = new ProjetosPage(page);
    await projetosPage.goto();
});

test('Deve cadastrar um projeto com sucesso', async () => {

    const projetoData = {
        nome: `Projeto ${faker.company.name()}`,
        descricao: faker.lorem.paragraph()
    };

    await projetosPage.cadastrarNovoProjeto(projetoData.nome, projetoData.descricao);
    await projetosPage.expectSuccessMessage('Projeto criado com sucesso');
});

test('Deve falhar ao tentar cadastrar um projeto sem nome', async() => {
    const projetoData = {
        nome: '',
        descricao: faker.lorem.paragraph()
    };

    await projetosPage.cadastrarNovoProjeto(projetoData.nome, projetoData.descricao);
    await projetosPage.expectErrorMessage('O nome do projeto é obrigatório.');
})

test('deve editar um projeto com sucesso', async () => {
    const projetoData = {
        nome: `Projeto ${faker.company.name()}`,
        descricao: faker.lorem.paragraph()
    };

    await projetosPage.cadastrarNovoProjeto(projetoData.nome, projetoData.descricao);

    const projetoDataUpdate = {
        nome: `Projeto ${faker.company.name()}`,
        descricao: faker.lorem.paragraph()
    };

    // Passamos o nome original do projeto (projetoData.nome) para localizá-lo na lista
    await projetosPage.editarProjeto(projetoData.nome, projetoDataUpdate.nome, projetoDataUpdate.descricao);
    await projetosPage.expectSuccessMessage('Projeto atualizado com sucesso');
})




