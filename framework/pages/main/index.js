class MainPage {
    constructor(page) {
        this.page = page
    }

    async navigateToChapter(chapterName) {
        await this.page.click(`//ul//li//a[text()='${chapterName}']`)
    }
}

module.exports = {
    MainPage
}