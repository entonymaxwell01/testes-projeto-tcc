import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CardPage } from "../pages/CardPage";
import { ProjetosPage } from "../pages/ProjetosPage";
import { CommonPage } from "../pages/CommonPage";
import { faker } from "@faker-js/faker";
import { getAuthToken } from "../utils/auth";
import { expect } from "@playwright/test";

type PagesFixtures = {
  loginPage: LoginPage;
  projetosPage: ProjetosPage;
  cardPage: CardPage;
  commonPage: CommonPage;
};

type ProjetoPayload = {
  titulo: string;
  descricao: string;
  dataInicio: string;
};

type ProjetoCriado = ProjetoPayload & {
  id: string;
};

type ApiFixtures = {
  projetoFactory: (
    overrides?: Partial<ProjetoPayload>,
  ) => Promise<ProjetoCriado>;
};

export const test = baseTest.extend<PagesFixtures & ApiFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  projetosPage: async ({ page }, use) => {
    const projetosPage = new ProjetosPage(page);
    await use(projetosPage);
  },

  cardPage: async ({ page }, use) => {
    const cardPage = new CardPage(page);
    await use(cardPage);
  },

  commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },

  projetoFactory: async ({ request }, use) => {
    const criarProjeto = async (
      overrides: Partial<ProjetoPayload> = {},
    ): Promise<ProjetoCriado> => {
      const apiUrl = process.env.API_URL || "http://localhost:3001";
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          "Token de autenticação não encontrado. Verifique o setup do Playwright.",
        );
      }

      const payload: ProjetoPayload = {
        titulo: `Projeto ${faker.company.name()}`,
        descricao: faker.lorem.paragraph(),
        dataInicio: new Date().toISOString(),
        ...overrides,
      };

      const response = await request.post(`${apiUrl}/projetos`, {
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status()).toBe(201);

      const responseBody = (await response.json()) as {
        id?: string;
      };

      expect(responseBody.id).toBeTruthy();

      return {
        ...payload,
        id: responseBody.id!,
      };
    };

    await use(criarProjeto);
  },
});
export { expect } from "@playwright/test";
