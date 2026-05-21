const {Loginpage} = require('./Loginpage');
const {DashboardPage} = require('./DashboardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {PlaceorderPage} = require('./PlaceorderPage');

class PageobjectManager
{
 constructor(page)
 {
    this.page = page;
    this.loginpage = new Loginpage(this.page);
    this.dashboardpage = new DashboardPage(this.page);
    this.checkoutpage = new CheckoutPage(this.page);
    this.placeorderpage = new PlaceorderPage(this.page);
 }

getLoginpage()
{
    return this.loginpage;
}
getDashboardpage()
{
    return this.dashboardpage;
}
getCheckoutpage()
{
    return this.checkoutpage;
}
getPlaceorderpage()
{
    return this.placeorderpage;
}





}
module.exports = {PageobjectManager};