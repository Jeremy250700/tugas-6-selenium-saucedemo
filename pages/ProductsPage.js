const {By}= require('selenium-webdriver')
const Page = require('./Page')

class ProductsPage extends Page{
    constructor(driver){
        super(driver)
    }
    pageTitleElement = By.css('.product_label')
    cartBadgeElement = By.css('.fa-layers-counter.shopping_cart_badge')
    cartIconElement = By.css('.shopping_cart_container a svg')
    async openPage(){
        await this.openUrl('/inventory.html')
	}
	async getPageTitle () {
		return await this.driver.findElement(this.pageTitleElement).getText()
    }
    /**
    @param {string} btnAddToCart
    */
    async addProductToCart(btnAddToCart){
        await this.driver.findElement(By.css(btnAddToCart)).click()
    }
    async getCartBadge(){
        return await this.driver.findElement(this.cartBadgeElement).getText()
    }
    async openCart(){
        await this.driver.findElement(this.cartIconElement).click()
    }
}
module.exports = ProductsPage