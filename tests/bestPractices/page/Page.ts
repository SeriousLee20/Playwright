import { Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";
import { Button } from "./Button";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { Alert } from "./Alert";

export class PageObject extends AbstractPage {
  private button: Button;
  private input: Input;
  private alert: Alert;
  readonly firstNameInputPlaceholder = `Please enter your first name`;
  readonly ageInputSelector = "#age";
  readonly isStudentCheckboxSelector = "#is-student";
  readonly applyDataButtonSelector = "#apply-data";
  readonly displayFirstNameSelector = "#display-first-name";
  readonly displayAgeSelector = "#display-age";
  readonly displayIsStudentSelector = "#display-is-student";
  readonly emptyFieldError = "#empty-field-error > p";
  readonly invalidAgeError = "#invalid-age-error > p";
  readonly iframeName = `iframe-demo`;
  readonly iframeSource = `../ISTQB_CTFL_Syllabus-v4.0.pdf`;

  constructor(page: Page) {
    super(page);
    this.button = new Button(page);
    this.input = new Input(page);
    this.alert = new Alert(page);
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async applyData(): Promise<void> {
    await this.button.clickButton(this.applyDataButtonSelector);
    // await this.page.locator(this.applyDataButtonSelector).click();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.input.setInputWithPlaceholder(
      this.firstNameInputPlaceholder,
      firstName
    );
  }

  async fillAge(age: string): Promise<void> {
    await this.input.setInputValue(this.ageInputSelector, age);
  }

  async checkIsStudent(isStudent: boolean): Promise<void> {
    if (isStudent) {
      await this.page.check(this.isStudentCheckboxSelector);
    } else {
      console.log("Not student");
    }
  }

  async checkIframeLoaded(): Promise<string | null> {
    // let frameElement = this.page.frame({name: source});
    // let content = await frameElement?.content();
    // window.alert(content);


    // let alertMessage = await this.alert.acceptAlert();
    let alertMessage = "";
    this.page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await this.page.waitForTimeout(2000);
      await dialog.accept();
    });
    return alertMessage;
  }

  async text(selector: string): Promise<string | null> {
    let textContent = await this.page.locator(selector).textContent();
    return textContent ?? null;
  }

  async timeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
