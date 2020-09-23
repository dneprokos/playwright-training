const playwright = require('playwright')
const {Chapter1Page} = require('../framework')
const chai = require('chai');
const expect = chai.expect
const config = require('config');
const BASE_URL = config.get('Environment.baseUrl');

let page, browser, context

describe('PLAYWRIGHT - CHAPTER1 PAGE TESTS', () => { 
    beforeEach(async () => {
        browser = await playwright['chromium'].launch({ headless: false/*, slowMo: 250*/ })
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto(BASE_URL + 'chapter1');
    })

    afterEach(async function() {
        if (this.currentTest.state == 'failed') {
            await page.screenshot({ path: `results/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
        }
        await browser.close()
    })

    it(`Navigate back to Main page`, async() => {
        //Arrange
        const chapter1Page = new Chapter1Page(page);

        //Act
        await chapter1Page.navigateHomePage();
        
        //Assert in BDD style
        expect(page.url()).to.equal(BASE_URL)
    })

    //TODO: Assert radio button
    //TODO: Assert drop-down
    //TODO: Assert check-box
    //TODO: Assert Load Text to the page button
    //TODO: Click this link to load a page with AJAX
    //TODO: Click this link to launch another window


})
