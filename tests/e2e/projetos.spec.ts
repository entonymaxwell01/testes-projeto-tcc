import { test } from "../../fixtures/page-fixtures";
import { faker } from "@faker-js/faker/locale/pt_BR";

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

test("Deve falhar ao tentar cadastrar um projeto sem nome", async ({
  projetosPage,
}) => {
  const projetoData = {
    nome: "",
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );
  await projetosPage.expectErrorMessage("O nome do projeto é obrigatório.");
});

test("deve editar um projeto com sucesso", async ({ projetosPage }) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );

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

test("deve excluir um projeto com sucesso", async ({ projetosPage }) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );

  await projetosPage.excluirProjeto(projetoData.nome);
  await projetosPage.expectSuccessMessage("Projeto excluído com sucesso!");
});
