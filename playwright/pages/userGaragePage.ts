import { Page, Locator, expect } from '@playwright/test';

export class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly garageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.garageHeader = page.getByRole('heading', { name: 'Garage' });
    }

    async navigate() {
        await this.page.goto('/panel/garage');
    }

    async expectLoaded() {
        await expect(this.garageHeader).toBeVisible();
    }
}