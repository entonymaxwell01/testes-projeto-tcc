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

test("Deve criar um card com sucesso", async ({ cardPage }) => {
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

  await cardPage.expectSuccessMessage("Nova funcionalidade criada!");
});
