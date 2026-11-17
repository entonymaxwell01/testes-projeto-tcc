import { test } from "../../fixtures/page-fixtures";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { expect } from "@playwright/test";
import { getAuthToken } from "../../utils/auth";
import projetosErrors from "../../data/projetos-errors.json";

test.beforeEach(async ({ projetosPage }) => {
  await projetosPage.goto();
});

test("Deve cadastrar um projeto com sucesso", async ({
  projetosPage,
  commonPage,
}) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  await projetosPage.goto();

  await projetosPage.cadastrarNovoProjeto(
    projetoData.nome,
    projetoData.descricao,
  );
  await commonPage.expectSuccessMessage("Projeto criado com sucesso");
});

test.describe("Projetos - Validação de campos obrigatórios", () => {
  for (const cenario of projetosErrors) {
    test(`Deve falhar ao cadastrar projeto com ${cenario.descricao}`, async ({
      projetosPage,
      commonPage,
    }) => {
      await projetosPage.cadastrarNovoProjeto(
        cenario.nome,
        cenario.descricaoProjeto,
      );
      await commonPage.expectErrorMessage(cenario.mensagemEsperada);
    });
  }
});

test("deve editar um projeto com sucesso", async ({
  projetosPage,
  commonPage,
  request,
  page,
}) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  const res = await request.post(`${process.env.API_URL}/projetos`, {
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
  await commonPage.expectSuccessMessage("Projeto atualizado com sucesso");
});

test("deve excluir um projeto com sucesso", async ({
  projetosPage,
  commonPage,
  page,
  request,
}) => {
  const projetoData = {
    nome: `Projeto ${faker.company.name()}`,
    descricao: faker.lorem.paragraph(),
  };

  const res = await request.post(`${process.env.API_URL}/projetos`, {
    data: {
      titulo: projetoData.nome,
      descricao: projetoData.descricao,
      dataInicio: new Date().toISOString(),
    },
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  await page.reload();

  await projetosPage.excluirProjeto(projetoData.nome);
  await commonPage.expectSuccessMessage("Projeto excluído com sucesso!");
});

test.describe("Projetos - Resiliência e Mocks de API", () => {
  test("Deve exibir mensagem de erro quando servidor estiver indisponível (status code 500)", async ({
    projetosPage,
    commonPage,
    page,
  }) => {
    const projetoData = {
      nome: `Projeto ${faker.company.name()}`,
      descricao: faker.lorem.paragraph(),
    };

    await page.route("**/projetos", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            message:
              "Erro ao salvar projeto. Por favor, tente novamente mais tarde.",
          }),
        });
      } else {
        await route.continue();
      }
    });

    await projetosPage.cadastrarNovoProjeto(
      projetoData.nome,
      projetoData.descricao,
    );
    await commonPage.expectPopupMessage("Erro ao salvar projeto.");
  });

  test("Deve exibir mensagem de lista vazia quando não houver projetos cadastrados", async ({
    projetosPage,
    page,
  }) => {
    await page.route(`${process.env.API_URL}/projetos`, async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      } else {
        await route.continue();
      }
    });

    await projetosPage.goto();
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByTestId("empty-state")).toContainText(
      "Nenhum projeto encontrado",
    );
  });

  test("Deve exibir mensagem de erro com queda de conexão", async ({
    projetosPage,
    commonPage,
    page,
  }) => {
    const projetoData = {
      nome: `Projeto ${faker.company.name()}`,
      descricao: faker.lorem.paragraph(),
    };

    await page.route("**/projetos", async (route) => {
      if (route.request().method() === "POST") {
        await route.abort("failed");
      } else {
        await route.continue();
      }
    });

    await projetosPage.cadastrarNovoProjeto(
      projetoData.nome,
      projetoData.descricao,
    );

    await commonPage.expectPopupMessage("Erro ao salvar projeto.");
  });
});
