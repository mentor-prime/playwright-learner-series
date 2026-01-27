import { test, expect } from "@playwright/test";
const {DashboardPage} = require('../../pages/DashboardPage');
const {LoginPage} = require('../../pages/LoginPage');

let dashboardPage;
let loginPage;

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({page}) =>{
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);
});

test("@PA-220 Dashboard - Verify that user information is correctly showed", async ({page}) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.clickLoginLink();
    await loginPage.verifyFieldsAtLoginPage();
    await loginPage.fillCredentials();
    await loginPage.clickLoginButton();
    await dashboardPage.verifyUserInformationShouldDisplay();
});

test("@PA-221 Dashboard - Verify that logout link is working properly", async({page}) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.clickLoginLink();
    await loginPage.verifyFieldsAtLoginPage();
    await loginPage.fillCredentials();
    await loginPage.clickLoginButton();
    await dashboardPage.verifyUserInformationShouldDisplay();
    await dashboardPage.clickLogoutLink();
    await dashboardPage.verifyUserShouldBeLoggedOut();
});

test("@PA-222 Dashboard - Check the shopping cart displays the correct number of items", async ({page}) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.clickOnATCButton();
    await dashboardPage.verifyCartCountToBe1();
});

test("@PA-225 - Dashboard - Check the functionality of subscribing to the newsletter", async ({page}) => {
    await dashboardPage.accessApplication();
    await dashboardPage.verifyLoginLinkShouldBeDisplayed();
    await dashboardPage.verifyNewLetterBlockShouldDisplay();
    await dashboardPage.enterEmailForNewLetterSubscription();
    await dashboardPage.clickNewsletterSubscribeButton();
    await dashboardPage.verifyNewLetterSubscriptionMessageShouldDisplay();
});

