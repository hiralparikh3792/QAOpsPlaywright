const {test, expect} = require ('@playwright/test');

test('End Flow test', async ({page})=>
{

    const email = "jolly.t@gmail.com";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Mahadev@123");
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState('networkidle');  // wait until all network calls are finished.
    await page.locator(".card-body b").first().waitFor(); // wait untill the first card is loaded. 
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click(); // we added parent (listitem) of Cart button other it will return 4 results that has name as Cart.
    await page.locator("div li").first().waitFor(); // wait until the first item in cart is loaded.
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click(); 
    await page.locator("form input").nth(1).fill("ind"); // CVV code
    await page.locator("form input").nth(2).fill("Hiral"); // name on card
    await page.locator("[name='coupon']").fill("rahulshettyacademy"); // coupon code
    await page.locator("[type='submit']").click(); // apply coupon
    await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay: 150});
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();



});


    
    