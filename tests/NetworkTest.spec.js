const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require('./Utils/APIUtils');
const LoginPayload = {userEmail:"jolly.t@gmail.com",userPassword:"Mahadev@123"};
const OrderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const FakePayloadOrders = {data:[], message:"No Orders"};
let response; 

test.beforeAll( async()=>
{
const APIContext = await request.newContext();
const apiUtils = new APIUtils(APIContext, LoginPayload);
response = await apiUtils.CreateOrder(OrderPayload);
    
});

test('Place the order', async ({page})=>
{    
    await page.addInitScript(value =>
    {
        window.localStorage.setItem("token", value);

    }, response.token);
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());  // original response from API fetching from the route.request as route can have request, headers, url etc
            let body = JSON.stringify(FakePayloadOrders);  // converting the fake response that is java script object in json format as the API response is in json format and it should be in string to pass in the fulfill method.
            route.fulfill({
                
                response,
                body,
            }) 

        });
       

        // intercepting response -> API Response > {Playwright fakeresponse} > browser > Render data on UI.
        await page.locator("button[routerlink*='myorders']").click(); // It goes to my orders page that has been created by API
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); // wait for actual API response and then take the fake response to render on UI.
        console.log (await page.locator(".mt-4").textContent());

       
     

        

    });