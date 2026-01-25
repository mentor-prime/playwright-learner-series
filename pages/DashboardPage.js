import {expect} from "@playwright/test";

class DashboardPage {

    constructor(page) {
        this.page  = page;
    }

    async accessApplication() {
        await this.page.goto("https://demowebshop.tricentis.com/");
    }

}

module.exports = { DashboardPage };