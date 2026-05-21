const { expect } = require ('@playwright/test');
class CheckoutPage
{
    

    constructor(page)
    {

        this.cartproducts = page.locator("div li");
        this.selectedproduct = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutproduct = page.locator("text=Checkout");

    }

async checkout()
{
        await this.cartproducts.first().waitFor(); 
        const bool = await this.selectedproduct.isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutproduct.click();
}


}
module.exports = {CheckoutPage};