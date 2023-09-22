const {By}= require('selenium-webdriver')
const Page = require('./Page')

class CartPage extends Page{
    constructor(driver){
        super(driver)
    }
    pageTitleElement = By.css('.subheader')
    async openPage(){
        await this.openUrl('/cart.html')
	}
    async getPageTitle () {
		return await this.driver.findElement(this.pageTitleElement).getText()
    }

    async getProductTitle(productTitle) {
		return await this.driver.findElement(By.css(productTitle)).getText()
    }

    async removeButton(){
      await this.driver.findElement(By.css('.btn_secondary.cart_button')).click()
    }
    async getRemovedItem(){
      await this.driver.findElement(By.css('.removed_cart_item')).getText()
    }
    async continueShoppingButton(){
      await this.driver.findElement(By.css('.cart_footer .btn_secondary')).click()
    }
    async checkoutButton(){
      await this.driver.findElement(By.css('.checkout_button')).click()
    }
}
module.exports = CartPage