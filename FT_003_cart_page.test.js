const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')
const CartPage = require('./pages/CartPage')
const CheckoutStep1Page = require('./pages/CheckoutStep1Page')

describe('FT_003_Cart_Page',function(){
    	/** @type {WebDriver} */ 
        let driver
        /** @type {LoginPage} */ 
        let loginPage
        /** @type {ProductsPage} */ 
        let productsPage
        /** @type {CartPage} */ 
        let cartPage
        /** @type {CheckoutStep1Page} */ 
        let chekoutStep1Page

        before(async function(){
            driver = await setupDriver()
            loginPage = new LoginPage(driver) 
            productsPage= new ProductsPage(driver)
            cartPage = new CartPage(driver)
            chekoutStep1Page = new CheckoutStep1Page(driver)
            await loginPage.openPage()
            await loginPage.loginProcess('standard_user','secret_sauce')
        })
        beforeEach(async function(){
            await productsPage.addProductToCart('.inventory_list .inventory_item:first-child .btn_inventory')
            await cartPage.openPage()
        })
        describe('CP_001 Mencoba menghapus product pada halaman cart',function(){
            it('Data product tidak muncul',async function(){
                await cartPage.removeButton()
                const removedItem = await cartPage.getRemovedItem()
                expect(removedItem).to.equal()
            })
        })
        describe('CP_002 Mencoba button continue shopping',function(){
            it('Menampilkan halaman list product',async function(){
                await cartPage.continueShoppingButton()
                const title = await productsPage.getPageTitle()
                expect(title).to.equal('Products')
            })
        })
        describe('CP_003 Mencoba button chekcout',function(){
            it('Menampilkan halaman chekcout',async function(){
                await cartPage.checkoutButton()
                const title = await chekoutStep1Page.getPageTitle()
                expect(title).to.equal('Checkout: Your Information')
            })
        })
        afterEach(async function () {
            await driver.sleep(2000)
            await productsPage.openPage()
        })
    
        after(async function () {
            await driver.close()
        })
})