const {test, expect} = require('@playwright/test');

test('@Web Popup Validations', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("http://google.com");
// await page.goBack();
// await page.goForward();

await expect (page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect (page.locator("#displayed-text")).toBeHidden();
//await page.pause(); 
page.on("dialog", dialog => dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
await page.locator("a[href*='#top']").click();
const framespage = page.frameLocator("#courses-iframe");
await framespage.locator("li a[href*='lifetime-access']:visible").click();
const textcheck = await framespage.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]); 
});


test('@Web Screenshot', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect (page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: "partialscreenshot.png"})
await page.locator("#hide-textbox").click();
await page.screenshot({path: "screenshot.png"})
await expect (page.locator("#displayed-text")).toBeHidden();

})

test('Visual Comparision', async ({page})=>
{

await page.goto("https://google.com/");
expect (await page.screenshot()).toMatchSnapshot("landing.png")

})














