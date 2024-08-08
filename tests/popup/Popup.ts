import { expect, Page } from "@playwright/test";

export class Popup {
  constructor(private page: Page) {}

  async handlingDialog(message: string) {
    let alertMessage: string;

    this.page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      // expect(dialog.type()).toBe('alert');
      expect(alertMessage).toBe(message);
      await this.page.waitForTimeout(1000);
      dialog.accept();
      console.log("1", alertMessage, dialog.type());
    });
  }

  async handlingTwoContinuousDialog(message1: string, message2: string) {
    let alertMessage: string;

    // should not have await infront of accept dialog step, so can complete two times of accept
    this.page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      expect(dialog.type()).toBe("confirm");
      expect(alertMessage).toBe(message1);
      await this.page.waitForTimeout(1000);
      dialog.accept();
      console.log("1", alertMessage, dialog.type());

      this.page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        alertMessage = dialog.message();
        await this.page.waitForTimeout(1000);
        expect(alertMessage).toBe(message2);
        console.log("2", alertMessage, dialog.type());
        dialog.accept();
      });
    });
  }
}
