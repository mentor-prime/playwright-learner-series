const { expect } = require("@playwright/test");
const { Users } = require("../test-data/Users"); // adjust path if needed

class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // --- Header / Auth ---
        this.loginLink = page.getByRole("link", { name: /log in/i });
        this.logoutLink = page.getByRole("link", { name: /log out/i });
        this.accountLink = page.locator("a.account");

        // --- Newsletter ---
        this.newsletterSection = page.locator(".block.block-newsletter");
        this.newsletterEmail = page.locator("#newsletter-email");
        this.newsletterSubscribeBtn = page.locator("#newsletter-subscribe-button");
        this.newsletterResult = page.locator(".newsletter-result-block");

        // --- Cart ---
        this.cartQty = page.locator(".cart-qty");
        this.addToCartButtons = page.getByRole("button", { name: /add to cart/i });

        // --- Top menu (UI navigation) ---
        this.menuBooks = page.locator('ul.top-menu a[href="/books"]');
        this.menuComputers = page.locator('ul.top-menu a[href="/computers"]');
        this.menuElectronics = page.locator('ul.top-menu a[href="/electronics"]');
        this.menuApparelShoes = page.locator('ul.top-menu a[href="/apparel-shoes"]');
        this.menuDigitalDownloads = page.locator('ul.top-menu a[href="/digital-downloads"]');
        this.menuJewelry = page.locator('ul.top-menu a[href="/jewelry"]');
        this.menuGiftCards = page.locator('ul.top-menu a[href="/gift-cards"]');
    }

    // ✅ Recommended method names
    async open() {
        await this.page.goto("https://demowebshop.tricentis.com/");
        await expect(this.page).toHaveURL(/demowebshop\.tricentis\.com/);
    }

    async expectLoginVisible() {
        await expect(this.loginLink).toBeVisible();
    }

    async clickLogin() {
        await this.loginLink.click();
        await expect(this.page).toHaveURL(/\/login$/);
    }

    async expectUserLoggedIn(username) {
        await expect(this.accountLink).toHaveText(username);
    }

    async expectLogoutVisible() {
        await expect(this.logoutLink).toBeVisible();
    }

    async clickLogout() {
        await this.logoutLink.click();
        await expect(this.loginLink).toBeVisible();
    }

    async expectUserLoggedOut(username) {
        await expect(this.page.locator("body")).not.toContainText(username);
    }

    async expectNewsletterBlockVisible() {
        await expect(this.newsletterSection).toBeVisible();
        await expect(this.newsletterEmail).toBeVisible();
        await expect(this.newsletterSubscribeBtn).toBeVisible();
    }

    async subscribeToNewsletter(email) {
        await this.newsletterEmail.fill(email);
        await this.newsletterSubscribeBtn.click();
    }

    async expectNewsletterSuccessMessage() {
        await expect(this.newsletterResult).toHaveText(
            "Thank you for signing up! A verification email has been sent. We appreciate your interest."
        );
    }

    async addToCartByIndex(index = 1) {
        await this.addToCartButtons.nth(index).click();
        await expect(this.cartQty).toBeVisible();
    }

    async expectCartQty(count) {
        await expect(this.cartQty).toContainText(`(${count})`);
    }

    async verifyTopMenuNavigations() {
        const cases = [
            { name: "Books", locator: this.menuBooks, url: /\/books$/, heading: "Books" },
            { name: "Computers", locator: this.menuComputers, url: /\/computers$/, heading: "Computers" },
            { name: "Electronics", locator: this.menuElectronics, url: /\/electronics$/, heading: "Electronics" },
            { name: "Apparel & Shoes", locator: this.menuApparelShoes, url: /\/apparel-shoes$/, heading: "Apparel & Shoes" },
            { name: "Digital downloads", locator: this.menuDigitalDownloads, url: /\/digital-downloads$/, heading: "Digital downloads" },
            { name: "Jewelry", locator: this.menuJewelry, url: /\/jewelry$/, heading: "Jewelry" },
            { name: "Gift Cards", locator: this.menuGiftCards, url: /\/gift-cards$/, heading: "Gift Cards" },
        ];

        for (const c of cases) {
            await c.locator.click();
            await expect(this.page).toHaveURL(c.url);
            await expect(this.page.getByRole("heading", { name: c.heading })).toBeVisible();
            console.log(`✓ ${c.name} - navigation passed`);
        }
    }

    // ---------------------------------------
    // ✅ Backward-compatible aliases (your old method names)
    // ---------------------------------------
    async accessApplication() {
        return this.open();
    }

    async verifyLoginLinkShouldBeDisplayed() {
        return this.expectLoginVisible();
    }

    async clickLoginLink() {
        return this.clickLogin();
    }

    async verifyUserInformationShouldDisplay() {
        return this.expectUserLoggedIn(Users.username);
    }

    async verifyNewLetterBlockShouldDisplay() {
        return this.expectNewsletterBlockVisible();
    }

    async enterEmailForNewLetterSubscription() {
        return this.newsletterEmail.fill(Users.username);
    }

    async clickNewsletterSubscribeButton() {
        return this.newsletterSubscribeBtn.click();
    }

    async verifyNewLetterSubscriptionMessageShouldDisplay() {
        return this.expectNewsletterSuccessMessage();
    }

    async clickOnATCButton() {
        return this.addToCartByIndex(1);
    }

    async verifyCartCountToBe1() {
        return this.expectCartQty(1);
    }

    async clickLogoutLink() {
        return this.expectLogoutVisible();
    }

    async verifyUserShouldBeLoggedOut() {
        return this.expectUserLoggedOut(Users.username);
    }

    async verifyPageNavigations() {
        return this.verifyTopMenuNavigations();
    }
}

module.exports = { DashboardPage };