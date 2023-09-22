const {By}= require('selenium-webdriver')
const Page = require('./Page')

class CheckoutCompletePage extends Page{
    constructor(driver){
        super(driver)
    }
    pageTitleElement = By.css('.subheader')
    async openPage(){
        await this.openUrl('/checkout-complete.html')
	}
    async getPageTitle () {
		return await this.driver.findElement(this.pageTitleElement).getText()
    }

}
module.exports = CheckoutCompletePage