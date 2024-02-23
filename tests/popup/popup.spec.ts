import {expect, test} from "@playwright/test";

test('Handling Alerts', async({page}) =>{
    await page.goto('file:/Users/amber/Documents/Testing/Playwright/tests/popup/index.html');
    let alertMessage = '';

    page.on('dialog', async(dialog)=>{
        alertMessage = dialog.message();
        expect(dialog.type()).toBe('alert');
        await page.waitForTimeout(1000);
        await dialog.accept();
    })

    await page.click('#show-alert');

    expect( alertMessage).toBe('This is a simple alert.');
})

test('Confirm Alert', async({page}) => {
    await page.goto('file:/Users/amber/Documents/Testing/Playwright/tests/popup/index.html');
    let alertMessage = '';

    // how to handle multiple dialog?
    page.on('dialog', async(dialog)=> {
        // expect(dialog.type()).toBe('confirm');
        alertMessage = dialog.message();
        await page.waitForTimeout(1000);
        dialog.dismiss();
    })

    await page.click('#show-confirm');
    expect(alertMessage).toBe('You clicked Cancel.');
})

test('Handling Popup', async({page})=>{
    await page.goto('file:/Users/amber/Documents/Testing/Playwright/tests/popup/index.html');

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup'),
    ]);

    // make sure pop up actually loaded
    await popup.waitForLoadState();
    await popup.close();
})