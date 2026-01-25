import { test, expect } from "@playwright/test";
const {DashboardPage} = require('../../pages/DashboardPage');

let dashboardPage;

test.beforeEach(async ({page}) =>{
    dashboardPage = new DashboardPage(page);
});

test("@PA-220 Dashboard - Verify that user information is correctly showed", async ({page}) => {
    await dashboardPage.accessApplication();
})