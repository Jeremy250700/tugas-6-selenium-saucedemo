const {By,WebDriver} = require('selenium-webdriver')
const {expect}= require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pages/LoginPage')
const ProductsPage = require('./pages/ProductsPage')

describe('FT_001_Login_Page',function(){
    	/** @type {WebDriver} */ 
        let driver
	    /** @type {LoginPage} */ 
        let loginPage
        /** @type {ProductsPage} */ 
        let productsPage

        before(async function(){
            driver = await setupDriver()
            loginPage = new LoginPage(driver) 
            productsPage= new ProductsPage(driver)
        })

        describe('LP_001 Mencoba Login dengan username: standard_user dan password: secret_sauce',function(){
            it('Menampilkan Halaman Products',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('standard_user','secret_sauce')

                const title = await productsPage.getPageTitle()
                expect(title).to.equal('Products')
            })
        })

        describe('LP_002 Mencoba Login dengan username: locked_out_user dan password: secret_sauce',function(){
            it('Menampilkan Error Message: Epic sadface: Sorry, this user has been locked out',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('locked_out_user','secret_sauce')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Sorry, this user has been locked out.')
            })
        })

        describe('LP_003 Mencoba Login dengan username: problem_user dan password: secret_sauce',function(){
            it('Menampilkan Halaman Products tanpa gambar product',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('problem_user','secret_sauce')

                const image = await driver.findElement(By.css('#item_4_img_link .inventory_item_img'))
                expect(await image.getAttribute("src")).to.equal('https://www.saucedemo.com/v1/img/sauce-backpack-1200x1500.jpgWithGarbageOnItToBreakTheUrl')
            })
        })

        describe('LP_004 Mencoba Login tanpa input username dan password',function(){
            it('Menampilkan Error Message: Epic sadface: Username is required',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('','')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username is required')
            })
        })

        describe('LP_005 Mencoba Login tanpa input username',function(){
            it('Menampilkan Error Message: Epic sadface: Username is required',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('','secret_sauce')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username is required')
            })
        })

        describe('LP_006 Mencoba Login tanpa input password',function(){
            it('Menampilkan Error Message: Epic sadface: Password is required',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('standard_user','')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Password is required')
            })
        })

        describe('LP_007 Mencoba Login dengan akun yang tidak terdaftar',function(){
            it('Menampilkan Error Message: Epic sadface: Username and password do not match any user in this service',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('akun1','akun2')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username and password do not match any user in this service')
            })
        })

        describe('LP_008 Mencoba Login dengan username:standard_user dan password yang tidak terdaftar',function(){
            it('Menampilkan Error Message: Epic sadface: Username and password do not match any user in this service',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('standard_user','akun2')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username and password do not match any user in this service')
            })
        })

        describe('LP_009 Mencoba Login dengan username:locked_out_user dan password yang tidak terdaftar',function(){
            it('Menampilkan Error Message: Epic sadface: Username and password do not match any user in this service',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('locked_out_user','akun2')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username and password do not match any user in this service')
            })
        })

        describe('LP_010 Mencoba Login dengan username:problem_user dan password yang tidak terdaftar',function(){
            it('Menampilkan Error Message: Epic sadface: Username and password do not match any user in this service',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('problem_user','akun2')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username and password do not match any user in this service')
            })
        })

        describe('LP_011 Mencoba Login dengan username yang tidak terdaftar dan password:secret_sauce',function(){
            it('Menampilkan Error Message: Epic sadface: Username and password do not match any user in this service',async function(){
                await loginPage.openPage()
                await loginPage.loginProcess('akun1','secret_sauce')

                const error = await loginPage.getErrorMessage()
                expect(error).to.equal('Epic sadface: Username and password do not match any user in this service')
            })
        })
        
        afterEach(async function () {
            await driver.sleep(2000)
        })
    
        after(async function () {
            await driver.close()
        })

})