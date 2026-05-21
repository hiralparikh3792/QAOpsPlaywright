const {test, expect} = require ('@playwright/test');



test('Browser Context Playwright test', async ({browser})=>
{

const context = await browser.newContext();
const page = await context.newPage();
const userName =  page.locator("#username");
const signIn = page.locator("#signInBtn");
const passWord = page.locator("[name='password']");
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log (await page.title());
await userName.fill("rahulshetty");
await passWord.fill("Learning@830$3mK2");
await signIn.click();
console.log (await page.locator("[style*='block;']").textContent());
await expect (page.locator("[style*='block;']")).toContainText("Incorrect");
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
// console.log(await cardTitles.first().textContent());
// console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);



});

test('@Web Page Playwright test', async ({page})=>
{

 await page.goto("https://google.com");
 console.log(await page.title());
 await expect (page).toHaveTitle("Google");

});

test('Page Controls', async ({page})=>
{

 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

 const userName =  page.locator("#username");
 const passWord = page.locator("[name='password']");
 const signIn = page.locator("#signInBtn");
 const dropDown = page.locator("select.form-control"); // tagname.class 
 const documentLink = page.locator("[href*='documents-request']");
 await dropDown.selectOption("consult");
 //await page.locator(".radiotextsty").last().click();
 await page.locator("[value = 'user']").click();
 await page.locator("#okayBtn").click(); 
 console.log (await page.locator("[value = 'user']").isChecked());
 await expect(page.locator("[value = 'user']")).toBeChecked();
 await page.locator("#terms").click();
 await expect(page.locator("#terms")).toBeChecked();
 await page.locator("#terms").uncheck();
 expect ( await page.locator("#terms").isChecked()).toBeFalsy();  
 await expect(documentLink).toHaveAttribute("class", "blinkingText");
 
 //await page.pause();


});

test('Window Handling', async ({browser})=>
{
const context = await browser.newContext(); // New Instance of browser with separate cache and cookies.
const page = await context.newPage();  // Parent page  
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
const documentLink = page.locator("[href*='documents-request']");  // child page locator on parent page and storing in a variable
const [newPage] = await Promise.all( // storing the new page object in a variable that returns array of promises by listening to the new page event and clicking the link to open the new page in parallel.
[ 
  context.waitForEvent('page'), // listen/Create new page to open & return the new page object. Promise: Pending, Rejected, Fullfilled  
  documentLink.click() // click to open the new page. Promise: Pending, Rejected, Fullfilled 
  // the array will keep on iterating inside these two steps parallely until all the promises are fullfilled in this block.
])
const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0];
// console.log(domain);
await page.locator("#username").fill(domain); 
await page.pause();
console.log (await page.locator("#username").inputValue());



});