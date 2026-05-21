const {test, expect} = require ('@playwright/test');
const {PageobjectManager} = require('../PageObjecs/PageobjectManager');
//Json > string > Js object
const dataset = JSON.parse(JSON.stringify(require('./Utils/ClientAppTestData.json'))); // parse method convert json to js object and stringify convert json to string

test('Page Item List test', async ({page})=>
{
    

    const products = page.locator(".card-body");
    const pageobjmanager = new PageobjectManager(page);
    const loginpage = pageobjmanager.getLoginpage();
    await loginpage.goTo();
    await loginpage.ValidLogin(dataset.username,dataset.password);
    const dashboardpage = pageobjmanager.getDashboardpage();
    await dashboardpage.searchproductAddCart(dataset.productname);
    await dashboardpage.navigateToCart();
    const checkoutpage = pageobjmanager.getCheckoutpage();
    await checkoutpage.checkout();
    const placeorderpage = pageobjmanager.getPlaceorderpage();
    await placeorderpage.orderplace(dataset.username);
    await placeorderpage.myorderspage();
 
        
});