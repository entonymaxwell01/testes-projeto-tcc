import { test } from "../../fixtures/page-fixtures";
import { faker } from "@faker-js/faker/locale/pt_BR";

test.beforeEach(async ({ page, projetoFactory }) => {
  const projeto = await projetoFactory();
  await page.goto(`/projetos/${projeto.id}/kanban`);
});

test("Deve criar um card com sucesso", async ({
  cardPage,
  page,
  commonPage,
}) => {
  const cardData = {
    codUs: `US-${faker.string.numeric()}`,
    prioridade: "Baixa",
    titulo: `Tarefa ${faker.company.buzzVerb()}`,
    descricao: faker.lorem.paragraph(),
  };

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/cartoes") &&
      response.request().method() === "POST" &&
      (response.status() === 200 || response.status() === 201),
  );

  await cardPage.criarCard(
    cardData.codUs,
    cardData.prioridade,
    cardData.titulo,
    cardData.descricao,
  );

  const response = await responsePromise;
  const { id: idCard } = await response.json();
  await cardPage.validarCadastradoCard(idCard);
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
