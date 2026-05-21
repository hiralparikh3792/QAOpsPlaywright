const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require('./Utils/APIUtils');
const LoginPayload = {userEmail:"jolly.t@gmail.com",userPassword:"Mahadev@123"};
const OrderPayload = {"orders":[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response; 

test.beforeAll( async()=>
{
const APIContext = await request.newContext();
const apiUtils = new APIUtils(APIContext, LoginPayload);
response = await apiUtils.CreateOrder(OrderPayload);
    
});

test('@API Place the order', async ({page})=>
{    
    await page.addInitScript(value =>
    {
        window.localStorage.setItem("token", value);

    }, response.token);
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("button[routerlink*='myorders']").click(); // It goes to my orders page that has been created by API
        await page.locator("tbody").waitFor(); // wait until table body is loaded then get the count of rows
        const tablerows = await page.locator("tbody tr")
        for (let i=0; i < await tablerows.count(); ++i)
        {
            const rowOrderId = await tablerows.nth(i).locator("th").textContent(); 
            if (response.OrderId.includes(rowOrderId))
            {
                await tablerows.nth(i).locator("button").first().click();
                break;
            }
        }
        //await page.locator(".col-text.-main").waitFor();
        const orderIdDetails = await page.locator(".col-text.-main").textContent();
         //await page.pause();
        expect (response.OrderId.includes(orderIdDetails)).toBeTruthy(); 

        

    });