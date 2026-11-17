import { test } from "../../fixtures/page-fixtures";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { getAuthToken } from "../../utils/auth";
import projetosErrors from "../../data/projetos-errors.json";

test("Deve cadastrar um projeto com sucesso", async ({ projetosPage }) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.goto();

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );
  await projetosPage.expectSuccessMessage("Projeto criado com sucesso");
});

test.describe("Projetos - Validação de campos obrigatórios", () => {
  for (const cenario of projetosErrors) {
    test(`Deve falhar ao cadastrar projeto com ${cenario.descricao}`, async ({
      projetosPage,
    }) => {
      await projetosPage.cadastrarNovoProjeto(
        cenario.nome,
        cenario.descricaoProjeto,
      );
      await projetosPage.expectErrorMessage(cenario.mensagemEsperada);
    });
  }
});

test("deve editar um projeto com sucesso", async ({
  projetosPage,
  request,
  page,
}) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  const res = await request.post("http://localhost:3001/projetos", {
    data: {
      titulo: projetoData.nome,
      descricao: projetoData.descricao,
      dataInicio: new Date().toISOString(),
    },
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  await page.reload();

  const projetoDataUpdate = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.editarProjeto(
    projetoData.nome,
    projetoDataUpdate.nome,
    projetoDataUpdate.descricao,
  );
  await projetosPage.expectSuccessMessage("Projeto atualizado com sucesso");
});

test("deve excluir um projeto com sucesso", async ({
  projetosPage,
  page,
  request,
}) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  const res = await request.post("http://localhost:3001/projetos", {
    data: {
      titulo: projetoData.nome,
      descricao: projetoData.descricao,
      dataInicio: new Date().toISOString(),
    },
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  await page.reload();

  await projetosPage.excluirProjeto(projetoData.nome);
  await projetosPage.expectSuccessMessage("Projeto excluído com sucesso!");
});
