// tests/dashboard/dashboard.spec.js
const { test, expect } = require("../ui/fixtures/appFixtures");
const {PDP} = require('../../pages/PDP.js');

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

test.only("@PA-223 Dashboard - verify the count displayed on wishlist", async ({ loggedInDashboard }) => {
    // Debug: Check what loggedInDashboard is
/*    console.log('loggedInDashboard type:', typeof loggedInDashboard);
    console.log('loggedInDashboard keys:', Object.keys(loggedInDashboard));
    console.log('Has page?', loggedInDashboard.page);
    console.log('Has locator?', typeof loggedInDashboard.locator);
*/
    // If loggedInDashboard is an object with a page property
    const page = loggedInDashboard.page || loggedInDashboard;
    const pdp = new PDP(page);

    // Get initial wishlist count
    const initialCount = await pdp.getWishlistCount();
    console.log(`Initial wishlist count: ${initialCount}`);

    // Add product to wishlist
    await pdp.openCategory("Electronics");
    await pdp.openFirstItemFromCategory();
    await pdp.addProductToWishList();

    // Verify count increased
    const updatedCount = await pdp.getWishlistCount();
    expect(updatedCount).toBe(initialCount + 1);

    console.log(`✅ Test passed - Wishlist count updated from ${initialCount} to ${updatedCount}`);
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