import {expect, test} from "./popupFixture";

test('Handling Alerts', async({page, popup}) =>{
    await page.goto('file:/Users/amber/Documents/Testing/Playwright/tests/popup/index.html');
    let alertMessage = '';

    // page.once('dialog', async(dialog)=>{
    //     alertMessage = dialog.message();
    //     expect(dialog.type()).toBe('alert');
    //     expect( alertMessage).toBe('This is a simple alert.');
    //     await page.waitForTimeout(1000);
    //     await dialog.accept();
    //     console.log("1", alertMessage,dialog.type())
    // })

    popup.handlingDialog("This is a simple alert.");
    await page.click('#show-alert');

    // page.once('dialog', async(dialog)=>{
    //     alertMessage = dialog.message();
    //     expect(dialog.type()).toBe('alert');
    //     expect( alertMessage).toBe('This is a simple alert.');
    //     await page.waitForTimeout(1000);
    //     await dialog.accept();
    //     console.log("2", alertMessage,dialog.type())
    // })
    popup.handlingDialog("This is a simple alert.");

    await page.click('#show-alert');

})

test('Confirm Alert', async({page, popup}) => {
    await page.goto('file:/Users/amber/Documents/Testing/Playwright/tests/popup/index.html');
    let alertMessage = '';

    // how to handle multiple dialog?
    // page.once('dialog', async(dialog)=> {
    //     // expect(dialog.type()).toBe('confirm');
    //     alertMessage = dialog.message();
    //     await page.waitForTimeout(1000);
    //     expect(alertMessage).toBe('Are you sure you want to proceed?');
    //     console.log("1", alertMessage,dialog.type())
    //     dialog.accept();
    //     page.once('dialog', async(dialog)=> {
    //         // expect(dialog.type()).toBe('confirm');
    //         alertMessage = dialog.message();
    //         await page.waitForTimeout(1000);
    //         expect(alertMessage).toBe('You clicked OK.');
    //         console.log("2", alertMessage, dialog.type())
    //         dialog.accept();
    //     })
    // })

    // await popup.handlingTwoContinuousDialog('Are you sure you want to proceed?', 'You clicked OK.');
    await popup.handlingDialog('Are you sure you want to proceed?');
    await popup.handlingDialog('You clicked OK.');

    await page.click('#show-confirm');

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