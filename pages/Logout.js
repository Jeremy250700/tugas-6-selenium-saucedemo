const {By,until}= require('selenium-webdriver')
const Page = require('./Page')

class Logout extends Page{
    constructor(driver){
        super(driver)
    }

    burgerIconElement = By.css('.bm-burger-button')
    logoutElement = By.css('.bm-item.menu-item:nth-child(3)')

    async logoutProcess (){
        await this.driver.findElement(this.burgerIconElement).click()
	    const logout = await this.driver.findElement(this.logoutElement)
	    await this.driver.wait(until.elementIsVisible(logout), 3000)
	    await logout.click()
    }

}
module.exports = Logout