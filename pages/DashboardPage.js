import {expect} from "@playwright/test";
// const { HeaderObjects } = require('../page-objects/HeaderObjects.js');
const HeaderObjects = require("../page-objects/HeaderObjects.js");

class DashboardPage {

    constructor(page) {
        this.page  = page;
    }

    async accessApplication() {
        await this.page.goto("https://demowebshop.tricentis.com/");
    }

    async verifyLoginLinkShouldBeDisplayed() {
        await expect(this.page.locator(HeaderObjects.menu.link_login)).toBeVisible();
    }

}

module.exports = { DashboardPage };