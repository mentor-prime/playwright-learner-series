/*
base.test.extend({ ... }) defines new fixtures
Each fixture gets dependencies like { page } or even other fixtures ({ dashboardPage, loginPage })
use(...) hands the created object to the test
After the test, Playwright finishes and cleans up automatically
*/

const base = require("@playwright/test");
const { DashboardPage } = require("../../../pages/DashboardPage");
const { LoginPage } = require("../../../pages/LoginPage");

exports.test = base.test.extend({
    // Provide DashboardPage as a fixture
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    // Provide LoginPage as a fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Optional: a "logged in" fixture (reusable login flow)
    loggedInDashboard: async ({ dashboardPage, loginPage }, use) => {
        await dashboardPage.accessApplication();
        await dashboardPage.verifyLoginLinkShouldBeDisplayed();
        await dashboardPage.clickLoginLink();

        await loginPage.verifyFieldsAtLoginPage();
        await loginPage.fillCredentials();
        await loginPage.clickLoginButton();

        await dashboardPage.verifyUserInformationShouldDisplay();

        // Now the test receives a ready-to-use logged-in dashboardPage
        await use(dashboardPage);
    },
});

exports.expect = base.expect;