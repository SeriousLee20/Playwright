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

  // test('Check iframe loaded', async({page}) =>{
  //   // let alertMessage = await pageObject.checkIframeLoaded();
  //   let alertMessage = "";
  //   page.on("dialog", async (dialog) => {
  //     alertMessage = dialog.message();
  //     await page.waitForTimeout(3000);
  //     await dialog.accept();
  //   });

  //   page.waitForTimeout(3000)
  //   expect(alertMessage).toBe('PDF loaded.')
  // })

  for (const data of Object.values(testData)) {
    if (data.testName) {
      test(data.testName, async () => {
        let age = data.age;
        let ageInt: number = +age;

        await pageObject.fillFirstName(data.firstName);
        await pageObject.fillAge(age);
        await pageObject.checkIsStudent(data.isStudent);
        await pageObject.applyData();

        if (data.age && data.firstName) {
          if (ageInt <= 0) {
            expect(await pageObject.text(pageObject.invalidAgeError)).toBe(
              data.expectedErrorText
            );
          } else {
            expect(
              await pageObject.text(pageObject.displayFirstNameSelector)
            ).toBe(data.expectedFirstName);

            expect(await pageObject.text(pageObject.displayAgeSelector)).toBe(
              data.expectedAge
            );

            expect(
              await pageObject.text(pageObject.displayIsStudentSelector)
            ).toBe(data.expectedIsStudent);
          }
        } else {
          expect(await pageObject.text(pageObject.emptyFieldError)).toBe(data.expectedErrorText);
        }

        console.log(data.expectedIsStudent);
      });
    }
  }

});


