import { Page, Locator, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.locator('h1#firstHeading'); 
        this.searchInput = page.locator('input[name="search"]');
    }

    async open() {
        await this.page.goto('/');
    }

    async searchFor(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');

    // Локатор первой ссылки в результатах
    const firstLink = this.page.locator('.mw-search-result-heading a').first();

    // Ждем немного, чтобы понять: мы в статье или в результатах?
    // Если появилась ссылка — кликаем по ней, чтобы попасть в статью.
    if (await firstLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        await firstLink.click();
    }
    // Если ссылки нет — значит, мы либо уже в статье, либо ничего не нашли.
}

    async checkTitle(expectedText: string) {
        // Проверяем заголовок статьи
        await expect(this.mainHeading).toContainText(expectedText);
    }
}