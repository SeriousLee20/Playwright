// Import the 'test' function from the '@playwright/test' library
import { test } from "@playwright/test";
// Import the 'FILES' class from the '../POM/File' file
import FILES from "./downloadFIles";
// Create an instance of the 'FILES' class
const download = new FILES();

// Test to verify XLSX data
test("Verify XLSX DATA ", async ({ page }) => {
  // Navigate to the root URL
  await page.goto("https://file-examples.com/index.php/sample-documents-download/sample-xls-download/");
  // Call the 'XLSX' method from the 'FILES' class to handle XLSX files
  await download.XLSX(page, "(//a[text()='Download sample xlsx file'])[1]");
});

// Test to verify PDF data
test("Verify PDF DATA ", async ({ page }) => {
  // Navigate to the root URL
  await page.goto("https://freetestdata.com/document-files/pdf/");
  // Call the 'PDF' method from the 'FILES' class to handle PDF files
  await download.PDF(page, "(//span[text()='Select File & Download'])[1]");
});

// Test to verify CSV data
test("Verify CSV DATA ", async ({ page }) => {
  // Navigate to the root URL
  await page.goto("https://wsform.com/knowledgebase/sample-csv-files/");
  // Call the 'PDF' method from the 'FILES' class to handle PDF files
  await download.CSV(page, "(//a[text()='locations.csv'])[1]", './downloads/file.csv');
});
