const {test, expect} = require ('@playwright/test');

test('Page Item List test', async ({page})=>
{
    
    const email = "jolly.t@gmail.com";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[type*='email']").fill(email);
    await page.locator("#userPassword").fill("Mahadev@123");
    await page.locator("#login").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor(); 
    //await page.locator(".card-body b").nth(0).textContent();
    const titles = (await page.locator(".card-body b").allTextContents());
    console.log(titles);
    const count = await products.count();
    for (let i=0; i < count; ++i)
    {
       if(await products.nth(i).locator("b").textContent() == productName)
         {
          await products.nth(i).locator("text= Add To Cart").click();
          break;
         }
        }
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor(); 
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator("form input").nth(1).fill("ind"); // CVV code
        await page.locator("form input").nth(2).fill("Hiral"); // name on card
        await page.locator("[name='coupon']").fill("rahulshettyacademy"); // coupon code
        await page.locator("[type='submit']").click(); // apply coupon
        await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
        await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay: 150});
        const dropdown = page.locator(".ta-results");
         await dropdown.waitFor(); // wait untill the dropdown is loaded.
         const optionCount = await dropdown.locator("button").count();
         for (let i=0; i < optionCount; ++i)
         {
            if (await dropdown.locator("button").nth(i).textContent() == " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
         }
         
         await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
         await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor(); // wait until table body is loaded then get the count of rows
        const tablerows = await page.locator("tbody tr")
        for (let i=0; i < await tablerows.count(); ++i)
        {
            const rowOrderId = await tablerows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
                await tablerows.nth(i).locator("button").first().click();
                break;
            }
        }
        //await page.locator(".col-text.-main").waitFor();
        const orderIdDetails = await page.locator(".col-text.-main").textContent();
        expect (orderId.includes(orderIdDetails)).toBeTruthy(); 

        
        
});