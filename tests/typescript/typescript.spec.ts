import { test, expect, selectors } from "@playwright/test";

const SELECTORS = {
  firstName: "#firstName",
  age: "#age",
  isStudent: "#isStudent",
  apply: "#applyData",
  displayFirstName: "#displayFirstName",
  displayAge: "#displayAge",
  displayIsStudent: "#displayIsStudent",
};

test.describe("Variable declarations & types", () => {
  let firstName: string = "John";
  let age: number = 30;
  let isStudent: boolean = false;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "file:/Users/amber/Documents/Testing/Playwright/tests/typescript/index.html"
    );
  });

  test("Declarations & types", async ({ page }) => {
    await page.fill(SELECTORS.firstName, firstName);
    await page.fill(SELECTORS.age, age.toString());
    if (isStudent) {
      await page.check(SELECTORS.isStudent);
    }
    await page.click(SELECTORS.apply);

    expect(await page.textContent(SELECTORS.displayFirstName)).toBe(
      `${firstName}`
    );
    expect(await page.textContent(SELECTORS.displayAge)).toBe(
      `${age.toString()}`
    );
    expect(await page.textContent(SELECTORS.displayIsStudent)).toBe(
      `${isStudent ? "Yes" : "No"}`
    );
    expect(await page.isChecked(SELECTORS.isStudent));
  });
});

test.describe("Type Definitions and Interfaces", () => {
  test.beforeEach(async({ page }) => {
    await page.goto(
      "file:/Users/amber/Documents/Testing/Playwright/tests/typescript/index.html"
    );
  });

  test("Type Def and Interfaces", async ({ page }) => {
    type User = {
      firstName: string;
      age: number;
      isStudent: boolean;
    };

    let user: User = {
      firstName: "Jane",
      age: 30,
      isStudent: false,
    };

    await page.fill(SELECTORS.firstName, user.firstName);
    await page.fill(SELECTORS.age, user.age.toString());
    if (user.isStudent) {
      await page.check(SELECTORS.isStudent);
    }

    await page.click(SELECTORS.apply);

    expect(await page.textContent(SELECTORS.displayFirstName)).toBe(user.firstName);
    expect(await page.textContent(SELECTORS.displayAge)).toBe(user.age.toString());
    expect(await page.textContent(SELECTORS.displayIsStudent)).toBe(
      user.isStudent ? "Yes" : "No"
    );

    // screenshot (config to ss on failure)
    await page.screenshot({path: 'fail.png'});

    // troubleshoot response
    page.on('response', (response)=>{
      console.log(`Received from ${response.url}`);
    })
  });
});
