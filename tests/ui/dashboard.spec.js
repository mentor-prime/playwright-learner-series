// tests/dashboard/dashboard.spec.js
const { test, expect } = require("../ui/fixtures/appFixtures");

test.describe.configure({ mode: "parallel" });

test("@PA-220 Dashboard - Verify that user information is correctly showed", async ({ dashboardPage, loginPage }) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.clickLoginLink();

    await loginPage.verifyFieldsAtLoginPage();
    await loginPage.fillCredentials();
    await loginPage.clickLoginButton();

    await dashboardPage.verifyUserInformationShouldDisplay();
});

test("@PA-221 Dashboard - Verify that logout link is working properly", async ({ loggedInDashboard }) => {
    await loggedInDashboard.clickLogoutLink();
    await loggedInDashboard.verifyUserShouldBeLoggedOut();
});

test("@PA-222 Dashboard - Check the shopping cart displays the correct number of items", async ({ dashboardPage }) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.clickOnATCButton();
    await dashboardPage.verifyCartCountToBe1();
});

test("@PA-224 Dashboard - Verify that each category link leads to the correct category page", async ({ loggedInDashboard }) => {
    await loggedInDashboard.verifyPageNavigations();
});

test("@PA-225 - Dashboard - Check the functionality of subscribing to the newsletter", async ({ dashboardPage }) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.verifyNewLetterBlockShouldDisplay();
    await dashboardPage.enterEmailForNewLetterSubscription();
    await dashboardPage.clickNewsletterSubscribeButton();
    await dashboardPage.verifyNewLetterSubscriptionMessageShouldDisplay();
});