import {chromium, test} from '@playwright/test';

// test.use({ javaScriptEnabled: false });
test.use({ userAgent: 'My user agent' });

// browser can have multiple tabs open
// passing page that is actually open
// test.skip, test.only
test('Basic Navigation', async({page}) => {
    await page.goto("https://gitlab.com/");
    await page.waitForTimeout(3000);
    await page.reload();
})

test('Interacting with Page Elements', async({page}) => {
    await page.goto("https://gitlab.com/");
    // await page.getByLabel('Search', { exact: true }).click();
    await page.locator('#be-navigation-desktop').getByRole('link', { name: 'Get free trial' }).click();
    // await page.locator('[data-testid="new-user-first-name-field"]').fill('John1');
    // await page.locator('[data-testid="new-user-last-name-field"]').fill('Snow1');
    await page.getByTestId('new-user-first-name-field').fill('John1');
    await page.getByTestId('new-user-last-name-field').fill('Snow1');
})

test('Using multiple locator methods', async({page}) => {

    await page.goto('https://gitlab.com/');
    await page.getByRole('button', {name: 'Main Menu'}).click();
    await page.getByRole('link', {name: 'Sign in'}).click();
    // await page.click(":has-text('Sign in')");
    // await page.waitForTimeout(5000);
})