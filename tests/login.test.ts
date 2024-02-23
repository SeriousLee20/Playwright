import { chromium, test } from "@playwright/test";

test("Login test demo", async ({}) => {
    // chrommium = browser engine
    // context = browser new context, doesnt share cookies/cache with other contexts
    // page = new tab
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // const page = await context.newPage();

    // await page.goto('https://ecommerce-playground.lambdatest.io')
    // // await page.locator("//a[@data-toggle='dropdown']//span[contains(.,'My account')]").hover();
    // await page.locator("//a[contains(text(),'My account')]").hover();
    // await page.getByText('Login').hover();
});
