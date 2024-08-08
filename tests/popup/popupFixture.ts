import { test as baseTest } from "@playwright/test";
import { Popup } from "./Popup";

type PageObjects = {
  popup: Popup,
};

export const test = baseTest.extend<PageObjects>({
  popup: async ({ page }, use) => {
    await use(new Popup(page));
  },
});

export {Page, Locator, expect} from "@playwright/test";

