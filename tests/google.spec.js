const { test, expect } = require('@playwright/test');

test('Open Google', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('Verify Google logo is visible', async ({ page }) => {
  await page.goto('https://www.google.com');
  const logo = page.locator('img[alt="Google"]');
  await expect(logo).toBeVisible();
});

test('Verify search box is visible', async ({ page }) => {
  await page.goto('https://www.google.com');
  const searchBox = page.locator('textarea[name="q"]');
  await expect(searchBox).toBeVisible();
});

test('Perform a Google search', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('textarea[name="q"]', 'Playwright automation');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/search/);
});

test('Verify search results page loads', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('textarea[name="q"]', 'OpenAI');
  await page.keyboard.press('Enter');
  const results = page.locator('#search');
  await expect(results).toBeVisible();
});

test('Verify first search result exists', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('textarea[name="q"]', 'Playwright');
  await page.keyboard.press('Enter');
  const firstResult = page.locator('#search a').first();
  await expect(firstResult).toBeVisible();
});

test('Verify Images tab is visible after search', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('textarea[name="q"]', 'Cats');
  await page.keyboard.press('Enter');
  const imagesTab = page.locator('a', { hasText: 'Images' });
  await expect(imagesTab).toBeVisible();
});

test('Navigate to Images tab', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('textarea[name="q"]', 'Dogs');
  await page.keyboard.press('Enter');
  await page.click('a:has-text("Images")');
  await expect(page).toHaveURL(/tbm=isch/);
});

test('Verify Google footer is present', async ({ page }) => {
  await page.goto('https://www.google.com');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});

test('Verify language links exist on homepage', async ({ page }) => {
  await page.goto('https://www.google.com');
  const languageLinks = page.locator('a[href*="hl="]');
  await expect(languageLinks.first()).toBeVisible();
});

// test('Verify page reload works', async ({ page }) => {
//   await page.goto('https://www.google.com');
//   await page.reload();
//   await expect(page).toHaveTitle(/Google/);
// });

// test('Verify Google homepage response is OK', async ({ page }) => {
//   const response = await page.goto('https://www.google.com');
//   expect(response.status()).toBe(200);
// });
