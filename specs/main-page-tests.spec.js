const playwright = require('playwright')
const { MainPage } = require('../framework');
const chai = require('chai');
const { assert } = require('chai');
const expect = chai.expect
chai.use(require('chai-string'));
const config = require('config');
const BASE_URL = config.get('Environment.baseUrl');

let page, browser, context
const pages = ['Chapter1', 'Chapter2', 'Chapter3', 'Chapter4', 'Chapter8'];

describe('PLAYWRIGHT - MAIN PAGE TESTS', () => {
    beforeEach(async () => {
        browser = await playwright['chromium'].launch({ headless: false/*, slowMo: 250*/ })
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto(BASE_URL);
    })

    afterEach(async function() {
        if (this.currentTest.state == 'failed') {
            await page.screenshot({ path: `results/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
        }
        await browser.close()
    })

    pages.forEach(pageName => {
        it(`Navigate to ${pageName} page`, async() => {
            //Arrange
            const mainPage = new MainPage(page);
            
            //Act
            await mainPage.navigateToChapter(`${pageName}`);

            //Assert style
            assert.equal(page.url(), `${BASE_URL}${pageName.toLowerCase()}`)
            assert.endsWith(page.url(), pageName.toLowerCase())

            //BDD Style
            expect(page.url()).to.equal(`${BASE_URL}${pageName.toLowerCase()}`)
            expect(page.url()).to.endsWith(pageName.toLowerCase());
        })
    })
})
