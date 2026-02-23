import { test } from './baseTest';
import searchItems from './searchData.json';

// --- ГРУППА ТЕСТОВ 1: ПОИСК СТАТЕЙ ---
test.describe('ГРУППА ТЕСТОВ 1: ПОИСК СТАТЕЙ', () => {
    for (const item of searchItems) {
        test(`Тест поиска статьи: ${item.search}`, async ({ articlePage }) => {
            await articlePage.open();
            
            // 1. Просто ищем (умная логика в Page Object сама кликнет, если надо)
            await articlePage.searchFor(item.search);
            
            // 2. Сразу проверяем заголовок. 
            // Если в JSON для абракадабры стоит expected: "error", этот тест упадет, 
            // поэтому убедись, что в JSON только реальные статьи или правильные ожидания.
            await articlePage.checkTitle(item.expected);
        });
    }
});