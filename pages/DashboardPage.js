const { expect } = require("@playwright/test");
const HeaderObjects = require("../page-objects/HeaderObjects.js");
const { Helper } = require("../utils/Helper.js");
const {Users} = require("../test-data/Users");
const DashboardObjects = require('../page-objects/DashboardObjects');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.helper = new Helper(page);
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

    async verifyNewLetterBlockShouldDisplay() {
        await expect(this.page.locator(DashboardObjects.newsletter.newsletter_section)).toBeVisible();
        await expect(this.page.locator(DashboardObjects.newsletter.field_email)).toBeVisible();
        await expect(this.page.locator(DashboardObjects.newsletter.button_subscribe)).toBeVisible();
    }

    async enterEmailForNewLetterSubscription() {
        await this.page.locator(DashboardObjects.newsletter.field_email).fill(Users.username);
    }

    async clickNewsletterSubscribeButton() {
        await this.page.locator(DashboardObjects.newsletter.button_subscribe).click();
    }

    async verifyNewLetterSubscriptionMessageShouldDisplay() {
        await expect(this.page.locator(".newsletter-result-block")).toHaveText("Thank you for signing up! A verification email has been sent. We appreciate your interest.")
    }
}

module.exports = { DashboardPage };