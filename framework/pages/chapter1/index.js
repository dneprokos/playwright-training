class Chapter1Page {
    constructor(page) {
        this.page = page
    }

    async navigateHomePage() {
        await this.page.click(`//a[@href='/']`)
    }
}

module.exports = {
    Chapter1Page
}