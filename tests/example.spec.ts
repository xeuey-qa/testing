import { test } from './baseTest';
import { expect } from '@playwright/test';
import searchItems from './searchData.json';
// Данные для ПЕРВОГО типа тестов (параметризация поиска)

// --- ГРУППА ТЕСТОВ 1: ПОИСК СТАТЕЙ ---
test.describe('ГРУППА ТЕСТОВ 1: ПОИСК СТАТЕЙ', () => {
    for (const item of searchItems) {
        test(`Тест поиска статьи: ${item.search}`, async ({ articlePage }) => {
            await articlePage.open();
            await articlePage.searchFor(item.search);
            
            // Если в JSON есть тесты на ошибку, проверяем заголовок только для обычных статей
            if (item.expected !== 'error') {
                await articlePage.checkTitle(item.expected);
            }
        });
    }
});

// --- ТЕСТ 2: НЕГАТИВНЫЙ СЦЕНАРИЙ (Другая логика) ---
test('Проверка поиска несуществующей статьи', async ({ articlePage, page }) => {
    await articlePage.open();
    await articlePage.searchFor('Asdfghjkl123456'); // Заведомая абракадабра
    
    // Тут мы проверяем, что появился текст о том, что ничего не найдено
    const noResultsMessage = page.getByText('Соответствий запросу не найдено');
    await test.step('Проверяем сообщение об отсутствии результатов', async () => {
    // Используем expect, чтобы тест реально ЖДАЛ и ПРОВЕРЯЛ
    await expect(noResultsMessage).toBeVisible();
});
});