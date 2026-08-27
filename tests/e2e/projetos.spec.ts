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
});




