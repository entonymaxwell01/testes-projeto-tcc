import { test } from "../../fixtures/page-fixtures";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { getAuthToken } from "../../utils/auth";

let projetoId: string;

test.beforeEach(async ({ page, request }) => {
  const res = await request.post("http://localhost:3001/projetos", {
    data: {
      titulo: `Projeto ${faker.company.name()}`,
      descricao: faker.lorem.paragraph(),
      dataInicio: new Date().toISOString(),
    },
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  projetoId = (await res.json()).id;

  await page.goto(`/projetos/${projetoId}/kanban`);
});

test("Deve criar um card com sucesso", async ({ cardPage, commonPage }) => {
  const cardData = {
    codUs: `US-${faker.string.numeric()}`,
    prioridade: "Baixa",
    titulo: `Tarefa ${faker.company.buzzVerb()}`,
    descricao: faker.lorem.paragraph(),
  };

  await cardPage.criarCard(
    cardData.codUs,
    cardData.prioridade,
    cardData.titulo,
    cardData.descricao,
  );

  await commonPage.expectSuccessMessage("Nova funcionalidade criada!");
});

test.describe("Cards -  Resiliência e Mocks de API", () => {
  test("Deve exibir mensagem de erro ao ocorrer erro no servidor ao criar um card", async ({
    cardPage,
    commonPage,
    page,
  }) => {
    await page.route("**/cartoes", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ error: "Erro interno do servidor" }),
        });
      } else {
        await route.continue();
      }
    });

    const cardData = {
      codUs: `US-${faker.string.numeric()}`,
      prioridade: "Baixa",
      titulo: `Tarefa ${faker.company.buzzVerb()}`,
      descricao: faker.lorem.paragraph(),
    };

    await cardPage.criarCard(
      cardData.codUs,
      cardData.prioridade,
      cardData.titulo,
      cardData.descricao,
    );
    await commonPage.expectPopupMessage("Erro ao salvar cartão");
  });
});
