
class APIUtils
{
    constructor(APIContext, LoginPayload)
    {
        this.APIContext = APIContext;
        this.LoginPayload = LoginPayload;
    
    }

    async getToken()
    {
        const LoginResponse = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            { 
                data: this.LoginPayload
            })
        const LoginResponseJson = await LoginResponse.json();
        const token = LoginResponseJson.token;
        console.log(token); 
        return token;
    }

    async CreateOrder(OrderPayload) 
    {
        let response = {};
        response.token = await this.getToken();
        const OrderResponse = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data: OrderPayload,
                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json"
                },
            })
        const OrderResponseJson = await OrderResponse.json();
        console.log(OrderResponseJson);
        const OrderId = OrderResponseJson.orders[0];
        response.OrderId = OrderId;
        return response;

        }

}
module.exports = {APIUtils};
