const { expect } = require ('@playwright/test');
class PlaceorderPage {

    constructor(page) {
        this.cvv = page.locator("form input");
        this.cardname = page.locator("form input");
        this.couponcode = page.locator("[name='coupon']");
        this.couponlink = page.locator("[type='submit']");
        this.coupontext = page.locator(".mt-1.ng-star-inserted");
        this.country = page.locator("[placeholder*='Select Country']");
        this.dropdownresults = page.locator(".ta-results");
        this.userText = page.locator(".user__name [type='text']");
        this.placeorder = page.locator(".action__submit");
        this.thankyoumessage = page.locator(".hero-primary");
        this.orderid = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myorders = page.locator("button[routerlink*='myorders']");
        this.tablebody = page.locator("tbody");
        this.tablerows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text.-main");
    }

    async orderplace(userName) {

        await this.cvv.nth(1).fill("ind"); // CVV code
        await this.cardname.nth(2).fill("Hiral"); // name on card
        await this.couponcode.fill("rahulshettyacademy"); // coupon code
        await this.couponlink.click(); // apply coupon
        await expect(this.coupontext).toHaveText("* Coupon Applied");
        await this.country.pressSequentially("ind", { delay: 150 });
        const dropdown = this.dropdownresults;
        await dropdown.waitFor(); // wait untill the dropdown is loaded.
        const optionCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionCount; ++i) {
            if (await dropdown.locator("button").nth(i).textContent() == " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(this.userText.first()).toHaveText(userName);
        await this.placeorder.click();  // Placing the order
    }

    async myorderspage()
    {
        await expect(this.thankyoumessage).toHaveText("Thankyou for the order. ");
        const orderId = await this.orderid.textContent();
        console.log(orderId);
        await this.myorders.click();
        await this.tablebody.waitFor(); // wait until table body is loaded then get the count of rows
        const tablerows = await this.tablerows;
        for (let i=0; i < await tablerows.count(); ++i)
        {
            const rowOrderId = await tablerows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
                await tablerows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await this.orderIdDetails.textContent();
        expect (orderId.includes(orderIdDetails)).toBeTruthy(); 
    }


}




module.exports = {PlaceorderPage}