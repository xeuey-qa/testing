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
   // Мы говорим функции: "Жди ошибку, а не ссылку!"
await articlePage.searchFor('Asdfghjkl123456', 'error');
});