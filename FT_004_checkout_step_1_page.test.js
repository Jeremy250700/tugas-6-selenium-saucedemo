const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')
const CartPage = require('./pages/CartPage')
const CheckoutStep1Page = require('./pages/CheckoutStep1Page')
const CheckoutStep2Page = require('./pages/CheckoutStep2Page')

describe('FT_004_Chekout_Step_1_Page',function(){
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

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver) 
        productsPage= new ProductsPage(driver)
        cartPage = new CartPage(driver)
        checkoutStep1Page = new CheckoutStep1Page(driver)
        checkoutStep2Page = new CheckoutStep2Page(driver)
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user','secret_sauce')
        await productsPage.addProductToCart('.inventory_list .inventory_item:first-child .btn_inventory')
        await cartPage.openPage()
        await checkoutStep1Page.openPage()
    })

    describe('CS1_001 Mencoba checkout dengan input first name: Jeremy, last name: Anjay, zip: 123',function(){
        it('Menampilkan halaman checkout step 2',async function(){
            await checkoutStep1Page.checkoutProcess('Jeremy','Anjay','123')
            const title = await checkoutStep2Page.getPageTitle()
            expect(title).to.equal('Checkout: Overview')
        })
/*         it ('Menampilkan payment information: SauceCard #31337',async function(){
            await checkoutStep2Page.openPage()
            const productTitle = await checkoutStep2Page.getPaymentInformation()
            expect(productTitle).to.equal('SauceCard #31337')
        }) */
    })
    describe('CS1_002 Mencoba button cancel',function(){
        it('Menampilkan halaman cart',async function(){
            await checkoutStep1Page.cancelButton()
            const title = await cartPage.getPageTitle()
            expect(title).to.equal('Your Cart')
        })
    })
    describe('CS1_003 Mencoba checkout tanpa input first name, last name, dan zip',function(){
        it('Menampilkan error dengan text: Error: First Name is required',async function(){
            await checkoutStep1Page.checkoutProcess('','','')
            const error = await checkoutStep1Page.getErrorMessage()
            expect(error).to.equal('Error: First Name is required')
        })
    })
    describe('CS1_004 Mencoba checkout tanpa input first name',function(){
        it('Menampilkan error dengan text: Error: First Name is required',async function(){
            await checkoutStep1Page.checkoutProcess('','Anjay','123')
            const error = await checkoutStep1Page.getErrorMessage()
            expect(error).to.equal('Error: First Name is required')
        })
    })
    describe('CS1_005 Mencoba checkout tanpa input last name',function(){
        it('Menampilkan error dengan text: Error: Last Name is required',async function(){
            await checkoutStep1Page.checkoutProcess('Jeremy','','123')
            const error = await checkoutStep1Page.getErrorMessage()
            expect(error).to.equal('Error: Last Name is required')
        })
    })
    describe('CS1_006 Mencoba checkout tanpa input zip',function(){
        it('Menampilkan error dengan text: Error: Postal Code is required',async function(){
            await checkoutStep1Page.checkoutProcess('Jeremy','Anjay','')
            const error = await checkoutStep1Page.getErrorMessage()
            expect(error).to.equal('Error: Postal Code is required')
        })
    })
    afterEach(async function () {
        await driver.sleep(2000)
        await checkoutStep1Page.openPage()
    })

    after(async function () {
        await driver.close()
    })
})