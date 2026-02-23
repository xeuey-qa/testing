import { Page, Locator, expect } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly searchInput: Locator; // Добавим переменную для поля поиска

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.locator('h1#firstHeading'); 
        // Локатор поля поиска на главной Википедии
        this.searchInput = page.locator('input[name="search"]');
    }


async searchFor(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');

    const firstResultLink = this.page.locator('.mw-search-result-heading a')
        .filter({ hasText: text })
        .first();
    const noResultsMsg = this.page.getByText('Соответствий запросу не найдено');

    // ХИТРОСТЬ: Ждем появления любого из этих элементов, но не долго
    // Мы пробуем найти ссылку. Если она появилась за 3 секунды — кликаем.
    try {
        await firstResultLink.waitFor({ state: 'visible', timeout: 3000 });
        await firstResultLink.click();
    } catch (e) {
        // Если ссылка НЕ появилась за 3 сек, значит это скорее всего негативный тест
        // Проверяем сообщение об ошибке
        await expect(noResultsMsg).toBeVisible();
    }




    
    // 3. Если shouldClick = false (негативный тест), 
    // мы просто ничего больше не делаем и выходим из метода.

    }

    async checkTitle(expectedText: string) {
        await expect(this.mainHeading).toContainText(expectedText);
    }
    async open() {
    await this.page.goto('/');
}
}