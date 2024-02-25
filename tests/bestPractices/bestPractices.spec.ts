import { test, expect } from "@playwright/test";
import { PageObject } from "./page/Page";

test.describe("Sample test", () => {
  let pageObject: PageObject;

  test.beforeEach(async({browser})=>{
    const page = await browser.newPage();
    pageObject = new PageObject(page);
    await pageObject.open('file:///Users/amber/Documents/Testing/Playwright/tests/bestPractices/index.html');
  })

  test("Fill all inputs", async() => {
    await pageObject.fillFirstName('John');
    await pageObject.fillAge('30');
    await pageObject.checkIsStudent(true);
    await pageObject.applyData();

    expect(await pageObject.text(pageObject.displayFirstNameSelector)).toBe('John');
    expect(await pageObject.text(pageObject.displayAgeSelector)).toBe('30');
    expect(await pageObject.text(pageObject.displayIsStudentSelector)).toBe('Yes');
  });

});
