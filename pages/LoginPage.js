const {By}= require('selenium-webdriver')
const Page = require('./Page')

class LoginPage extends Page{
    constructor(driver){
        super(driver)
    }

    usernameElement = By.id('user-name')
    passwordElement = By.id('password')
    submitEletment = By.id('login-button')
    errorElement = By.css('h3[data-test="error"]')

    async openPage(){
        await this.openUrl('/')
    }
    /**
    @param {string} username
	@param {string} password
    */

    async loginProcess (username, password){
        await this.driver.findElement(this.usernameElement).sendKeys(username)
        await this.driver.findElement(this.passwordElement).sendKeys(password)
        await this.driver.findElement(this.submitEletment).click()
    }
    async getErrorMessage(){
        return await this.driver.findElement(this.errorElement).getText()
    }
    async getButtonLogin(){
        return await this.driver.findElement(this.submitEletment).getAttribute('value')
    }
}
module.exports = LoginPage