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


// Добавляем второй параметр expectedType, чтобы функция знала, что искать
async searchFor(text: string, expectedType: 'success' | 'error' = 'success') {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');

    const firstResultLink = this.page.locator('.mw-search-result-heading a').first();
    const noResultsMsg = this.page.getByText('Соответствий запросу не найдено');

    if (expectedType === 'success') {
        // Для позитивных тестов: ждем ссылку и кликаем
        // Увеличиваем таймаут до 10 сек для стабильности в облаке
        await firstResultLink.waitFor({ state: 'visible', timeout: 10000 });
        await firstResultLink.click();
    } else {
        // Для негативных тестов: просто проверяем сообщение об ошибке
        await expect(noResultsMsg).toBeVisible({ timeout: 10000 });
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