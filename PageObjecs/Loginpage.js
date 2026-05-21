class Loginpage {

constructor(page) 
{
    this.page = page
    this.userName = page.locator("[type*='email']");
    this.password = page.locator("#userPassword");
    this.signInbutton = page.locator("#login");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async ValidLogin(username,password)
{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}
}
module.exports = {Loginpage};

