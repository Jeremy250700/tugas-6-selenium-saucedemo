const {Builder,Browser, By, until} = require('selenium-webdriver')


async function main(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build()

    await driver.get('https://www.saucedemo.com/v1/')
    await driver.findElement(By.id('user-name')).sendKeys('standard_user')
    await driver.findElement(By.id('password')).sendKeys('secret_sauce')
    await driver.findElement(By.id('login-button')).click()

    await driver.findElement(By.css('.btn_primary.btn_inventory')).click()
    await driver.findElement(By.css('.btn_primary.btn_inventory:nth-child(2)')).click()
    await driver.executeScript(function(){
        window.scrollTo({
            top: 400,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_primary.btn_inventory:last-child')).click()
    await driver.executeScript(function(){
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.shopping_cart_container a svg')).click()

    await driver.executeScript(function(){
        window.scrollTo({
            top: 400,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_action.checkout_button')).click()

    await driver.findElement(By.id('first-name')).sendKeys('Jeremy')
    await driver.findElement(By.id('last-name')).sendKeys('Anjay')
    await driver.findElement(By.id('postal-code')).sendKeys('321')
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_primary.cart_button')).click()

    await driver.executeScript(function(){
        window.scrollTo({
            top: 800,
            behavior:'smooth'
        })
    })
    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.btn_action.cart_button')).click()

    await new Promise(done => setTimeout(done, 3000))
    await driver.findElement(By.css('.bm-burger-button')).click()
    await new Promise(done => setTimeout(done, 3000))
	const logout = await driver.findElement(By.css('.bm-item.menu-item:nth-child(3)'))
	await driver.wait(until.elementIsVisible(logout), 3000)
	await logout.click()

}
main()