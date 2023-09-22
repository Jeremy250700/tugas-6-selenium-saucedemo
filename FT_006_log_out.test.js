const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')
const CartPage = require('./pages/CartPage')
const CheckoutStep1Page = require('./pages/CheckoutStep1Page')
const CheckoutStep2Page = require('./pages/CheckoutStep2Page')
const CheckoutCompletePage = require('./pages/CheckoutCompletePage')
const Logout = require('./pages/Logout')
const { beforeEach } = require('mocha')

describe('FT_001_Login_Page',function(){
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
        /** @type {Logout} */ 
        let logout

        before(async function(){
            driver = await setupDriver()
            loginPage = new LoginPage(driver) 
            productsPage= new ProductsPage(driver)
            cartPage = new CartPage(driver)
            checkoutStep1Page = new CheckoutStep1Page(driver)
            checkoutStep2Page = new CheckoutStep2Page(driver)
            checkoutComplete = new CheckoutCompletePage(driver)
            logout = new Logout(driver)
        })
        beforeEach(async function(){
            await loginPage.openPage()
            await loginPage.loginProcess('standard_user','secret_sauce')
        })

        describe('LO_001 Mencoba Logout pada halaman products',function(){
            it('Menampilkan Halaman Login',async function(){
                await logout.logoutProcess()
                const title = await loginPage.getButtonLogin()
                expect(title).to.equal('LOGIN')
            })
        })
        describe('LO_002 Mencoba Logout pada halaman cart',function(){
            it('Menampilkan Halaman Login',async function(){
                await cartPage.openPage()
                await logout.logoutProcess()
                const title = await loginPage.getButtonLogin()
                expect(title).to.equal('LOGIN')
            })
        })
        describe('LO_003 Mencoba Logout pada halaman checkout step 1',function(){
            it('Menampilkan Halaman Login',async function(){
                await checkoutStep1Page.openPage()
                await logout.logoutProcess()
                const title = await loginPage.getButtonLogin()
                expect(title).to.equal('LOGIN')
            })
        })
        describe('LO_004 Mencoba Logout pada halaman checkout step 2',function(){
            it('Menampilkan Halaman Login',async function(){
                await checkoutStep2Page.openPage()
                await logout.logoutProcess()
                const title = await loginPage.getButtonLogin()
                expect(title).to.equal('LOGIN')
            })
        })
        describe('LO_005 Mencoba Logout pada halaman checkout complete',function(){
            it('Menampilkan Halaman checkout complete',async function(){
                await checkoutComplete.openPage()
                await logout.logoutProcess()
                const title = await loginPage.getButtonLogin()
                expect(title).to.equal('LOGIN')
            })
        })
        
        afterEach(async function () {
            await driver.sleep(2000)
        })
    
        after(async function () {
            await driver.close()
        })

})