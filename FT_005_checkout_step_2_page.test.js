const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')
const CartPage = require('./pages/CartPage')
const CheckoutStep1Page = require('./pages/CheckoutStep1Page')
const CheckoutStep2Page = require('./pages/CheckoutStep2Page')
const CheckoutCompletePage = require('./pages/CheckoutCompletePage')
describe('FT_005_Chekout_Step_2_Page',function(){
    /** @type {WebDriver} */ 
    let driver
    /** @type {LoginPage} */ 
    let loginPage
    /** @type {ProductsPage} */ 
    let productsPage
    /** @type {CartPage} */ 
    let cartPage
    /** @type {CheckoutStep1Page} */ 
    let checkoutStep1Page
    /** @type {CheckoutStep2Page} */ 
    let checkoutStep2Page
    /** @type {CheckoutCompletePage} */ 
    let checkoutComplete

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver) 
        productsPage= new ProductsPage(driver)
        cartPage = new CartPage(driver)
        checkoutStep1Page = new CheckoutStep1Page(driver)
        checkoutStep2Page = new CheckoutStep2Page(driver)
        checkoutComplete = new CheckoutCompletePage(driver)
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user','secret_sauce')
        await productsPage.addProductToCart('.inventory_list .inventory_item:first-child .btn_inventory')
        await cartPage.openPage()
        await checkoutStep1Page.openPage()
        await checkoutStep2Page.openPage()
        await driver.executeScript(function(){
            window.scrollTo({
                top: 800,
                behavior:'smooth'
            })
        })
    })
    beforeEach(async function(){
        await driver.executeScript(function(){
            window.scrollTo({
                top: 800,
                behavior:'smooth'
            })
        })
    })

    describe('CS2_001 Mencoba button cancel',function(){
        it('Menampilkan halaman list product',async function(){
            await checkoutStep2Page.cancelButton()
            const title = await productsPage.getPageTitle()
            expect(title).to.equal('Products')
        })
        it('Menampilkan angak 1 pada icon cart',async function(){
            const cartNum = await productsPage.getCartBadge()
            expect(cartNum).to.equal('1')
        })
    })
    describe('CS2_002 Mencoba menyelesaikan checkout',function(){
        it('Menampilkan halaman checkout complete',async function(){
            await checkoutStep2Page.finishButton()
            const title = await checkoutComplete.getPageTitle()
            expect(title).to.equal('Finish')
        })
    })

    afterEach(async function () {
        await driver.sleep(2000)
        await checkoutStep2Page.openPage()
    })

    after(async function () {
        await driver.close()
    })
})