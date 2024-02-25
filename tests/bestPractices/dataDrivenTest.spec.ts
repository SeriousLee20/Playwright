import { test, expect } from "@playwright/test";
import { PageObject } from "./page/Page";
import * as testData from "./testData.json";

test.describe("Data Driven Test", () => {
  let pageObject: PageObject;

  test.beforeEach(async ({ browser }) => {
    const page = await browser.newPage();
    pageObject = new PageObject(page);
    await pageObject.open(
      "file:///Users/amber/Documents/Testing/Playwright/tests/bestPractices/index.html"
    );
  });

  for (const data of Object.values(testData)) {
    if (data.testName) {
      test(data.testName, async () => {
        await pageObject.fillFirstName(data.firstName);
        await pageObject.fillAge(data.age);
        await pageObject.checkIsStudent(data.isStudent);
        await pageObject.applyData();

        expect(await pageObject.text(pageObject.displayFirstNameSelector)).toBe(data.expectedFirstName);
        expect(await pageObject.text(pageObject.displayAgeSelector)).toBe(data.expectedAge);
        expect(await pageObject.text(pageObject.displayIsStudentSelector)).toBe(data.expectedIsStudent)
        console.log(data.expectedIsStudent)
      });
    }
  }


});
