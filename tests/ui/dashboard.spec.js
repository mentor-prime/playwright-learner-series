import { test, expect } from "@playwright/test";
const {DashboardPage} = require('../../pages/DashboardPage');
const {LoginPage} = require('../../pages/LoginPage');

let dashboardPage;
let loginPage;

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