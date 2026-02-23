import { Page,  Locator } from '@playwright/test';

export class Wikipage {
    readonly page: Page;
    readonly searchInput: Locator;

constructor (page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('searchbox', { name: 'Искать в Википедии' });
}
async navigate() {
    await this.page.goto('/');
}
async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');}

async clockOnResult(resultText: string) {
    await this.page.getByRole('link', { name: resultText }).first().click();}
async open() {
    await this.page.goto('/');
}      
}

