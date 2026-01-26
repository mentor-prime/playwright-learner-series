const { expect } = require("@playwright/test");
const HeaderObjects = require("../page-objects/HeaderObjects.js");
const { Helper } = require("../utils/Helper.js");
const {Users} = require("../test-data/Users"); // adjust path if your folder differs

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.helper = new Helper(page); // ✅ now it's a real constructor
    }

    async accessApplication() {
        await this.page.goto("https://demowebshop.tricentis.com/");
    }

    async verifyLoginLinkShouldBeDisplayed() {
        await expect(this.page.locator(HeaderObjects.menu.link_login)).toBeVisible();
    }

    async clickLoginLink() {
        await this.helper.clickLocator(HeaderObjects.menu.link_login);
        await this.page.waitForTimeout(3000);
    }

    async verifyUserInformationShouldDisplay() {
        await expect(this.page.locator('a.account').nth(0)).toHaveText(Users.username);
    }
}

module.exports = { DashboardPage };