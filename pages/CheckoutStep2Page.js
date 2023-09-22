const {By}= require('selenium-webdriver')
const Page = require('./Page')

class CheckoutStep2Page extends Page{
    constructor(driver){
        super(driver)
    }
    pageTitleElement = By.css('.subheader')
    paymentInformationElement = By.css('.summary_info .summary_value_label:first-child')
    finishButtonElement = By.css('.btn_action.cart_button')
    cancelButtonElement = By.css('.cart_cancel_link')
    async openPage(){
        await this.openUrl('/checkout-step-two.html')
	}
    async getPageTitle () {
		return await this.driver.findElement(this.pageTitleElement).getText()
    }
    async getPaymentInformation() {
		return await this.driver.findElement(this.paymentInformationElement).getText()
    }
    async finishButton(){
        await this.driver.findElement(this.finishButtonElement).click()
    }
    async cancelButton(){
        await this.driver.findElement(this.cancelButtonElement).click()
    }
}
module.exports = CheckoutStep2Page