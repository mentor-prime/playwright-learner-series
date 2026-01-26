class Helper {
    constructor(page) {
        this.page = page;
    }

    async clickLocator(locator, index = 0) {
        const loc = this.page.locator(locator).nth(index);
        await loc.click();
    }
}

module.exports = { Helper };