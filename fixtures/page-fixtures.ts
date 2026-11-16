import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CardPage } from "../pages/CardPage";
import { ProjetosPage } from "../pages/ProjetosPage";

type PagesFixtures = {
  loginPage: LoginPage;
  projetosPage: ProjetosPage;
  cardPage: CardPage;
};

export const test = baseTest.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  projetosPage: async ({ page }, use) => {
    const projetosPage = new ProjetosPage(page);
    await projetosPage.goto();
    await use(projetosPage);
  },

  cardPage: async ({ page }, use) => {
    const cardPage = new CardPage(page);
    await use(cardPage);
  },
});
export { expect } from "@playwright/test";
