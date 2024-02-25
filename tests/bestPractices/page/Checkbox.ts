import { Page } from "@playwright/test";

export class Checkbox{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async check(selector: string): Promise<void>{
        this.page.locator(selector).check();
    }

    async uncheck(selector: string): Promise<void>{
        this.page.locator(selector).uncheck();
    }
}