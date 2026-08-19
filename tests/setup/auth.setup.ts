import { test as setup } from '@playwright/test';
import path from 'path';
import 'dotenv/config';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');
const api_url = process.env.API_URL

setup('authenticate via API', async ({ request }) => {
  const response = await request.post(`${api_url}/login`, {
    data: {
      email: process.env.USER_EMAIL,
      senha: process.env.USER_PASSWORD
    }
  });

  //console.log(response)

  setup.expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authFile });
});
