import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  const response = await request.post('/api/auth/signin', {
    data: {
      email: 'emily.willson.test@mail.com',
      password: '12587oiuU#f',
      remember: true,
    },
  });

  expect(response.status()).toBe(200);
  await request.storageState({ path: authFile });
});