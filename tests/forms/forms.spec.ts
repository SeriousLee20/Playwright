import { test, expect } from "@playwright/test";

test('Automation Form Submission', async({page}) => {

    await page.goto('https://demo.playwright.dev/todomvc')
    const newToDo = page.getByPlaceholder('What needs to be done?');
    await newToDo.fill('JohnDoe1');
    // await page.waitForTimeout(1000);
    await newToDo.press('Enter')
    // await page.waitForTimeout(1000);
    await newToDo.fill('JohnDoe2');
    // await page.waitForTimeout(1000);
    await newToDo.press('Enter')

    const firstToDo = page.getByTestId('todo-item').nth(0);
    await firstToDo.getByRole('checkbox').check();

    const secondToDo = page.getByTestId('todo-item').nth(1);
    await expect(secondToDo).not.toHaveClass('completed');
    await expect(firstToDo).toHaveClass('completed');
;})

test('Handling Form', async({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const placeholder = "[placeholder= 'What needs to be done?']";
    await page.fill(placeholder, 'JohnDoe1');
    await page.locator(placeholder).press('Enter');

    await page.fill(placeholder, 'JohnDoe2');
    await page.locator(placeholder).press('Enter');

    const checkbox = page.locator('.toggle').nth(0);
    await checkbox.check();
})