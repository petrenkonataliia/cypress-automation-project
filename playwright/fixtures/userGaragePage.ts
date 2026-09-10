import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/userGaragePage';

type MyFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
    },
});

export { expect } from '@playwright/test';