import { Page } from "@playwright/test";

export class Input{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async setInputValue(selector: string, value: string){
        await this.page.locator(selector).fill(value);
    }

    async setInputWithPlaceholder(placeholder: string, value: string){
        await this.page.getByPlaceholder(placeholder).fill(value);
    }
}