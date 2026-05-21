const {test, expect, request} = require('@playwright/test');
const ExcelJS = require('exceljs'); // ExcelJS is class and 'exceljs' is library we are importing




async function WriteExcelTest(SearchText, change, replaceText, filepath) {
  
    const workbook = new ExcelJS.Workbook(); // Creating object of class 'ExcelJS' to access methods of libraries
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await Readexcel(worksheet, SearchText); 
    const cell = worksheet.getCell(output.row, output.column+change.ColChange); // getcell method will get the cell value of that row and column
    cell.value = replaceText; // Republic or 350 , cell.value method will fetch or edit with new text
    await workbook.xlsx.writeFile(filepath);

}

async function Readexcel(worksheet, SearchText) {
   let output = { row: -1, column: -1 }; // Giving any random default value to this JS object properties
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // console.log(cell.value); 
            if (cell.value === SearchText) { // Mango
                output.row = rowNumber;  // Mango's row number 
                output.column = colNumber; // Mango column number 

                //console.log(rowNumber);  // Fetching the coordinates
                //console.log(colNumber); // Fetching the coordinates
            }

        })


    })
    return output;  // It returns the row and column number of searchtext which is 'Banana'
}



test("Upload Download Excel Validation", async ({page })=>
{
    
    const textSearch = "Mango"
    const updateValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const DownloadPromise = page.waitForEvent('download'); //Inform Playwright to wait & keep an eye to come across Download event to occur
    await page.getByRole("button", {name:'Download'}).click();
    const download = await DownloadPromise; // Wait untill the download event is fully complete.
    const filePath = "/Users/self-realization/downloads/download.xlsx"; 
    WriteExcelTest(textSearch,{rowChange:0,ColChange:2}, updateValue, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);




})