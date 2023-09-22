const {By}= require('selenium-webdriver')
const Page = require('./Page')

class CheckoutStep1Page extends Page{
    constructor(driver){
        super(driver)
    }
    pageTitleElement = By.css('.subheader')
    async openPage(){
        await this.openUrl('/checkout-step-one.html')
	}
    async getPageTitle () {
		return await this.driver.findElement(this.pageTitleElement).getText()
    }
    /**
    @param {string} firstName
	@param {string} lastName
    @param {string} zip
    */
   firstNameElement = By.id('first-name')
   lastNameElement = By.id('last-name')
   zipElement = By.id('postal-code')
   continueButtonElement = By.css('.checkout_buttons .cart_button')
   cancelButtonElement = By.css('.checkout_buttons .cart_cancel_link')
   errorElement = By.css('h3[data-test="error"]')
    async checkoutProcess (firstName,lastName,zip){
        await this.driver.findElement(this.firstNameElement).sendKeys(firstName)
        await this.driver.findElement(this.lastNameElement).sendKeys(lastName)
        await this.driver.findElement(this.zipElement).sendKeys(zip)
        await this.driver.findElement(this.continueButtonElement).click()
    }

    async cancelButton(){
        await this.driver.findElement(this.cancelButtonElement).click()
    }
    async getErrorMessage(){
        return await this.driver.findElement(this.errorElement).getText()
    }


}
module.exports = CheckoutStep1Page