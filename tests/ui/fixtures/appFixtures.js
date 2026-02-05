const base = require("@playwright/test");
const { DashboardPage } = require("../../../pages/DashboardPage");
const { LoginPage } = require("../../../pages/LoginPage");
const { Users } = require("../../../test-data/Users"); // adjust if your path differs

exports.test = base.test.extend({
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    loggedInDashboard: async ({ dashboardPage, loginPage }, use) => {
        // ✅ using the NEW recommended methods
        await dashboardPage.open();
        await dashboardPage.expectLoginVisible();
        await dashboardPage.clickLogin();

        // login steps (keep as your LoginPage already does)
        await loginPage.verifyFieldsAtLoginPage();
        await loginPage.fillCredentials();
        await loginPage.clickLoginButton();

        await dashboardPage.expectUserLoggedIn(Users.username);

        await use(dashboardPage);
    },
});

exports.expect = base.expect;