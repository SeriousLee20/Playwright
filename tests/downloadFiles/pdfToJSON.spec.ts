import { test, expect } from '@playwright/test';
import PDFParser from 'pdf2json';

//ref: https://dev.to/ryanroselloog/verify-pdf-contents-using-playwright-and-pdf2json-1dob
test.describe('assert PDF contents using Playwright', () => {
  let pdfContents: any
  test.beforeAll(async ({page}) => {
    await page.goto('https://freetestdata.com/document-files/pdf/');
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        await page.locator("(//span[text()='Select File & Download'])[1]").click(),

    ]);
    await download.saveAs(`./downloads/${download.suggestedFilename}`);
    pdfContents = await getPDFContents(`./downloads/${download.suggestedFilename}`);
    // pdfContents = await getPDFContents('./pdf_sample.pdf')
  })

  test('pdf file should have 6 pages', async () => {
    expect(pdfContents.Pages.length, 'The pdf should have 1 pages').toEqual(3);
  });

  test('shows the correct meta informaion (keywords)', async () => {
    // expect(pdfContents.Meta.Keywords, 'PDF keyword was incorrect').toEqual('Standard Fees and Charges, 003-750, 3-750');
  });

  test('contains the correct subheading text', async () => {
    const rawText = pdfContents.Pages[0].Texts[3].R[0].T
    // need to know where exact position of the text
    console.log(rawText)
    expect(decodeURI(rawText), 'The subheading text was incorrect').toContain('Lorem ipsum dolor sit amet,');
  });
});

async function getPDFContents(pdfFilePath: string): Promise<any> {
  let pdfParser = new PDFParser();
  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', (errData: { parserError: any }) =>
      reject(errData.parserError)
    );
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      resolve(pdfData);
    });

    pdfParser.loadPDF(pdfFilePath);
  });
}