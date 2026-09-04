import { test } from "@playwright/test";
import { CardPage } from "../../pages/CardPage";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { ProjetosPage } from "../../pages/ProjetosPage";

let cardPage: CardPage;
let projetosPage: ProjetosPage;

test.beforeEach(async ({ page }) => {
  cardPage = new CardPage(page);
  projetosPage = new ProjetosPage(page);
  projetosPage.goto();
});

test("Deve criar um card com sucesso", async () => {
  const cardData = {
    codUs: `US-${faker.string.numeric()}`,
    prioridade: "Baixa",
    titulo: `Tarefa ${faker.company.buzzVerb()}`,
    descricao: faker.lorem.paragraph(),
  };

  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );

  await projetosPage.acessarProjeto(projetoData.nome);

  await cardPage.criarCard(
    cardData.codUs,
    cardData.prioridade,
    cardData.titulo,
    cardData.descricao,
  );

  await cardPage.expectSuccessMessage("Nova funcionalidade criada!");
});
