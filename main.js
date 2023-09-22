const {Builder,Browser, By, until} = require('selenium-webdriver')


async function main(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build()

    await driver.get('https://www.saucedemo.com/v1/')
    /* Login */
    await driver.findElement(By.id('user-name')).sendKeys('standard_user')
    await driver.findElement(By.id('password')).sendKeys('secret_sauce')
    await driver.findElement(By.id('login-button')).click()

    /* Add item to cart */
    await driver.findElement(By.css('.btn_primary.btn_inventory')).click()
    await driver.findElement(By.css('.inventory_list .inventory_item:nth-child(4) .btn_inventory')).click()
    await driver.executeScript(function(){
        window.scrollTo({
            top: 400,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.inventory_list .inventory_item:last-child .btn_inventory')).click()

    /* Open cart */
    await driver.executeScript(function(){
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.shopping_cart_container a svg')).click()

    /* Open checkout */    
    await driver.executeScript(function(){
        window.scrollTo({
            top: 400,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_action.checkout_button')).click()

    /* Checkout form */
    await driver.findElement(By.id('first-name')).sendKeys('Jeremy')
    await driver.findElement(By.id('last-name')).sendKeys('Anjay')
    await driver.findElement(By.id('postal-code')).sendKeys('321')
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_primary.cart_button')).click()

    /* Checkout step 2 */
    await driver.executeScript(function(){
        window.scrollTo({
            top: 800,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_action.cart_button')).click()

    /* Logout */
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.bm-burger-button')).click()
    await new Promise(done => setTimeout(done, 3000))
	const logout = await driver.findElement(By.css('.bm-item.menu-item:nth-child(3)'))
	await driver.wait(until.elementIsVisible(logout), 3000)
	await logout.click()

}
main()