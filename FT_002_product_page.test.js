const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')
const CartPage = require('./pages/CartPage')

describe("FT_002_Product_Page", function(){
	/** @type {WebDriver} */ 
    let driver
    /** @type {LoginPage} */ 
    let loginPage
    /** @type {ProductsPage} */ 
    let productsPage
    /** @type {CartPage} */ 
    let cartPage

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver) 
        productsPage= new ProductsPage(driver)
        cartPage = new CartPage(driver)
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user','secret_sauce')
    })

    describe('PP_001 Menambahkan 1 product ke cart',function(){
        it('Menampilkan angka 1 pada icon cart',async function(){
            await productsPage.openPage()
            await productsPage.addProductToCart('.inventory_list .inventory_item:first-child .btn_inventory')

            const cartNum = await productsPage.getCartBadge()
            expect(cartNum).to.equal('1')
        })
        it('Menampilkan nama product: Sauce Labs Backpack pada halaman product',async function(){
            await productsPage.openCart()
            await cartPage.openPage()
            const productTitle = await cartPage.getProductTitle('.inventory_item_name:first-child')
            expect(productTitle).to.equal('Sauce Labs Backpack')
        })
    })
    describe('PP_002 Menambahkan 3 product ke cart',function(){
        it('Menampilkan angka 3 pada icon cart',async function(){
            await productsPage.openPage()
            await productsPage.addProductToCart('.inventory_list .inventory_item:nth-child(2) .btn_inventory')
            await productsPage.addProductToCart('.inventory_list .inventory_item:nth-child(3) .btn_inventory')
            const cartNum = await productsPage.getCartBadge()
            expect(cartNum).to.equal('3')
        })
        /* it('Menampilkan nama product: Sauce Labs Backpack pada halaman product',async function(){
            await productsPage.openCart()
            await cartPage.openPage()
            const productTitle = await cartPage.getProductTitle('.cart_list .cart_item:first-child .inventory_item_name')
            expect(productTitle).to.equal('Sauce Labs Backpack')
        })
        it('Menampilkan nama product: Sauce Labs Bike Light pada halaman product',async function(){
            const productTitle = await cartPage.getProductTitle('.cart_item:nth-child(2) .inventory_item_name')
            expect(productTitle).to.equal('Sauce Labs Bike Light')
        })
        it('Menampilkan nama product: Sauce Labs Bolt T-Shirt pada halaman product',async function(){
            await driver.executeScript(function(){
                window.scrollTo({
                    top: 400,
                    behavior:'smooth'
                })
            })
            const productTitle = await cartPage.getProductTitle('.cart_list .cart_item:last-child .inventory_item_name')
            expect(productTitle).to.equal('Sauce Labs Bolt T-Shirt')
        }) */
    })
    describe('PP_003 Mencoba remove product',function(){
        it('Text pada button berubah menjadi ADD TO CART',async function(){
            await productsPage.openPage()
            await productsPage.addProductToCart('.inventory_list .inventory_item:first-child .btn_inventory')

            const button = await driver.findElement(By.css('.btn_primary.btn_inventory')).getText()
            expect(button).to.equal('ADD TO CART')
        })
    })
    afterEach(async function () {
        await driver.sleep(2000)
    })

    after(async function () {
        await driver.close()
    })

})