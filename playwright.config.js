// playwright.config.js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    // ----------------------------
    // Test location & structure
    // ----------------------------
    testDir: "./tests",

    // Run tests in parallel at file level
    fullyParallel: true,

    // Fail the build if test.only is committed
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Workers
    workers: process.env.CI ? 2 : undefined,

    // ----------------------------
    // Reporting
    // ----------------------------
    reporter: [
        ["list"],
        ["html", { open: "never", outputFolder: "playwright-report" }],
        ["json", { outputFile: "playwright-report/results.json" }],
    ],

    // ----------------------------
    // Shared settings
    // ----------------------------
    use: {
        baseURL: "https://demowebshop.tricentis.com",

        // Auto screenshots & videos on failure
        screenshot: "only-on-failure",
        video: "retain-on-failure",

        // Trace is very useful for debugging flaky tests
        trace: "on-first-retry",

        // Default timeout settings
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,

        // Browser behavior
        headless: true,
        viewport: { width: 1366, height: 768 },

        // Ignore HTTPS issues if any
        ignoreHTTPSErrors: true,

        // Locale / timezone (optional but useful for consistency)
        locale: "en-US",
        timezoneId: "UTC",
    },

    // ----------------------------
    // Global timeouts
    // ----------------------------
    timeout: 60 * 1000,
    expect: {
        timeout: 10 * 1000,
    },

    // ----------------------------
    // Projects (browsers)
    // ----------------------------
    projects: [
        {
            name: "Chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "Firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "WebKit",
            use: { ...devices["Desktop Safari"] },
        },
    ],

    // ----------------------------
    // Output directories
    // ----------------------------
    outputDir: "test-results",
});