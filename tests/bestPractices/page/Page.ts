import { Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";
import { Button } from "./Button";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";

export class PageObject extends AbstractPage {
  private button: Button;
  private input: Input;
  private checkbox: Checkbox;
  readonly firstNameInputSelector = "#firstName";
  readonly ageInputSelector = "#age";
  readonly isStudentCheckboxSelector = "#isStudent";
  readonly applyDataButtonSelector = "#applyData";
  readonly displayFirstNameSelector = "#displayFirstName";
  readonly displayAgeSelector = "#displayAge";
  readonly displayIsStudentSelector = "#displayIsStudent";

  constructor(page: Page) {
    super(page);
    this.button = new Button(page);
    this.input = new Input(page);
    this.checkbox = new Checkbox(page);
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async applyData(): Promise<void> {
    await this.button.clickButton(this.applyDataButtonSelector);
    // await this.page.locator(this.applyDataButtonSelector).click();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.input.setInputValue(this.firstNameInputSelector, firstName);
  }

  async fillAge(age: string): Promise<void> {
    await this.input.setInputValue(this.ageInputSelector, age);
  }

  async checkIsStudent(isStudent: boolean): Promise<void> {
    if (isStudent) {
      await this.page.check(this.isStudentCheckboxSelector);
    } else{
        console.log('Not student');
    }
  }

  async text(selector: string): Promise<string|null>{
    let textContent = await this.page.locator(selector).textContent();
    return textContent ?? null;
  }

  async timeout(ms: number): Promise<void>{
    await this.page.waitForTimeout(ms);
  }
}
