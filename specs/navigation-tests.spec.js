const playwright = require('playwright')
const { MainPage } = require('../framework');
const chai = require('chai')
const expect = chai.expect
const BASE_URL = 'http://book.theautomatedtester.co.uk/';

let page, browser, context
const pages = ['Chapter1', 'Chapter2', 'Chapter3', 'Chapter4', 'Chapter8'];

describe('PLAYWRIGHT - NAVIGATION TESTS', () => {
    beforeEach(async () => {
        browser = await playwright['chromium'].launch({ headless: false, slowMo: 250 })
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
        it(`Navigate ${pageName} page`, async() => {
            const mainPage = new MainPage(page);            
            await mainPage.navigateToChapter(`${pageName}`);
            expect(page.url()).to.equal(`${BASE_URL}${pageName.toLowerCase()}`)
        })
    })
})
