const {test, expect} = require ('@playwright/test');

test('Calendar Validations', async ({page})=>
{

const monthNumber = "6"; 
const date = "15";
const year = "2027";
const expectedList = [monthNumber, date, year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click(); 
await page.locator(".react-calendar__navigation__label").click(); 
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); // Taking the month locator and using nth method to click on the month. We are using number function to convert month number from string to integer and -1 because index starts from 0.
await page.locator("//abbr[text()='"+date+"']").click();
const inputs = await page.locator(".react-date-picker__inputGroup__input"); // taking common locator of all 3 input fields and iterating it.

for (let i=0; i < expectedList.length; i++) // let i iterate untill the length of expected list. 
{
    const inputValue = await inputs.nth(i).getAttribute("value"); // we can use .inputvalue to get the attribute of the value. Value "6" will be retrieved in first iteration, "15" in second and "2027" in third.
    expect(inputValue).toEqual(expectedList[i]); // we are comparing the value retrieved from input field with the expected list.
}




});