import { expect, test } from "@playwright/test";

const testData = {
  firstName: "John",
  lastName: "Snow",
  address: "1111",
  number: "1234546324",
};

test.describe("User Registration Tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "file:///Users/amber/Documents/Testing/Playwright/tests/testSuite/index.html"
    );
  });
  test("Register with valid data", async ({ page }) => {
    await page.fill("#firstName", testData.firstName);
    await page.fill("#lastName", testData.lastName);
    await page.fill("#address", testData.address);
    await page.fill("#number", testData.number);
    await page.click("#register");

    const firstNameText = await page.locator("#displayFirstName").textContent();
    const lastNameText = await page.locator("#displayLastName").textContent();
    const addressText = await page.locator("#displayAddress").textContent();
    const numberText = await page.locator("#displayNumber").textContent();

    expect(firstNameText).toEqual(testData.firstName);
    expect(lastNameText).toEqual(testData.lastName);
    expect(addressText).toEqual(testData.address);
    expect(numberText).toEqual(testData.number);
  });

  test("Register with blank input", async ({ page }) => {
    await page.fill("#firstName", testData.firstName);
    await page.fill("#lastName", testData.lastName);
    await page.click("#register");

    const error = await page.textContent('#error > p');
    expect(error).toBe('Please fill in all fields.');
  });

//   cannot hv duplicate test name
  test('Register with all empty fields', async({page})=>{
    await page.click('#register');

    const error = await page.textContent('#error > p');
    expect(error).toBe('Please fill in all fields.');

  })
});
