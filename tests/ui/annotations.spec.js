const { test, expect } = require("../ui/fixtures/appFixtures");

test.describe('group', {
    tag: '@report',
}, () => {
    test('test report header', async ({ page }) => {
        // ...
    });

    test('test full report', {
        tag: ['@slow', '@vrt'],
    }, async ({ page }) => {
        // ...
    });
});