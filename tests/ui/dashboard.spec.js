const { test, expect } = require("../ui/fixtures/appFixtures");
const { PDP } = require("../../pages/PDP"); // keep your path
const { Users } = require("../../test-data/Users");

test.describe.configure({ mode: "parallel" });

test("@PA-220 Dashboard - Verify that user information is correctly showed", { tag: ['@dashboard', '@login']}, async ({ dashboardPage, loginPage }) => {
    await dashboardPage.open();
    await dashboardPage.expectLoginVisible();
    await dashboardPage.clickLogin();
    await loginPage.verifyFieldsAtLoginPage();
    await loginPage.fillCredentials();
    await loginPage.clickLoginButton();
    await dashboardPage.expectUserLoggedIn(Users.username);
});

test("@PA-221 Dashboard - Verify that logout link is working properly", async ({ loggedInDashboard }) => {
    await loggedInDashboard.expectLogoutVisible();
    await loggedInDashboard.clickLogout();
    await loggedInDashboard.expectUserLoggedOut(Users.username);
});

test("@PA-222 Dashboard - Check the shopping cart displays the correct number of items", async ({ dashboardPage }) => {
    await dashboardPage.open();
    await dashboardPage.expectLoginVisible();

    await dashboardPage.addToCartByIndex(1);
    await dashboardPage.expectCartQty(1);
});

test("@PA-223 Dashboard - verify the count displayed on wishlist", async ({ loggedInDashboard, page }) => {
    // const page = loggedInDashboard.page; // ✅ loggedInDashboard is DashboardPage object
    const pdp = new PDP(page);

    const initialCount = await pdp.getWishlistCount();
    console.log(`Initial wishlist count: ${initialCount}`);

    await pdp.openCategory("Electronics");
    await pdp.openFirstItemFromCategory();
    await pdp.addProductToWishList();

    const updatedCount = await pdp.getWishlistCount();
    expect(updatedCount).toBe(initialCount + 1);

    console.log(`✅ Test passed - Wishlist count updated from ${initialCount} to ${updatedCount}`);
});

test("@PA-224 Dashboard - Verify that each category link leads to the correct category page", async ({ loggedInDashboard }) => {
    await loggedInDashboard.verifyTopMenuNavigations();
});

test("@PA-225 - Dashboard - Check the functionality of subscribing to the newsletter", async ({ dashboardPage }) => {
    await dashboardPage.open();
    await dashboardPage.expectLoginVisible();
    await dashboardPage.expectNewsletterBlockVisible();
    await dashboardPage.subscribeToNewsletter(Users.username);
    await dashboardPage.expectNewsletterSuccessMessage();
});