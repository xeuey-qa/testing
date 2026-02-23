import { test as base } from '@playwright/test';
import { Wikipage } from '../models/WikiPage';
import { ArticlePage } from '../models/ArticlePage';


// 1. Добавляем ВСЕ наши страницы в типы
type MyFixtures = {
  wikiPage: Wikipage;
  articlePage: ArticlePage; // Теперь TypeScript видит обе страницы
};

// 2. ОДИН РАЗ расширяем базовый тест
export const test = base.extend<MyFixtures>({
  
  // Описываем создание первой страницы
  wikiPage: async ({ page }, use) => {
    await use(new Wikipage(page));
  },

  // Описываем создание второй страницы
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect } from '@playwright/test';