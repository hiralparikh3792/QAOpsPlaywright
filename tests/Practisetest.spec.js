import {test, expect} from '@playwright/test';


test('Playwright Special Locators', async ({page})=> 
{


    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.getByLabel("Name").fill("Hiral");
    //await page.getByLabel("Email").fill("hiral3792@gmail.com");
    await page.getByPlaceholder("Password").fill("Hiral@123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check(); // can use check or click method. 
    //await page.getByLabel("Date of Birth").fill("1992/07/03");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").click();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
    








});