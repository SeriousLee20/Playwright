import { Page } from "@playwright/test";

export class Alert {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async acceptAlert() {
    let alertMessage = "";
    this.page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await this.page.waitForTimeout(2000);
      await dialog.accept();
    });

    return alertMessage;
  }
}
