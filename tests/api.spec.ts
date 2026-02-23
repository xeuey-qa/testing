import { test, expect } from '@playwright/test';
import searchItems from './searchData.json';

test.describe('API проверки Википедии', () => {

    for (const item of searchItems) {
        // Пропускаем тест, если это заведомая ошибка (или проверяем на 404)
        if (item.expected === 'error') continue;

        test(`API: Проверка статьи ${item.search}`, async ({ request }) => {
            // Отправляем запрос к API Википедии
            const response = await request.get(`https://ru.wikipedia.org/api/rest_v1/page/summary/${item.search}`);
            
            // Проверяем, что сервер ответил "ОК" (статус 200)
            expect(response.ok()).toBeTruthy();
            
            const body = await response.json();
            
            // Проверяем, что в ответе пришло нужное название статьи
            expect(body.title).toContain(item.expected);
            console.log(`Статья "${body.title}" найдена через API`);
        });
    }
});