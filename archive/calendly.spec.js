// @ts-check
//const { test, expect } = require('@playwright/test');


import { test, expect } from '@playwright/test';

// Use Chromium browser for this test
test.use({ browserName: 'chromium' });

test.setTimeout(60000);

test('Schedule Calendly', async ({ page }) => {
  await page.goto('https://calendly.com/d/ckmw-x2y-6rq/automation');
  await page.getByLabel('Friday, October 25 - Times').click();
  await page.locator('button', { hasText: ":" }).nth(1).click();
  await page.locator('button', { hasText: 'Next' }).click(); 
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('John Doe');
  await page.getByLabel('Name *').press('Tab');
  await page.getByLabel('Email *').fill('john.doe@nc-calendly-rpa.com');
  await page.getByLabel('Email *').press('Tab');
  await page.getByLabel('Please share anything that').click();
  await page.getByLabel('Please share anything that').fill('Share anything about the meeting');
  await page.getByLabel('Please share anything that').press('Tab');
  await page.getByLabel('File ID *').fill('MandatoryFileID:123456789');
  await page.getByRole('button', { name: 'Schedule Event' }).click();
  await expect(page.locator('h1')).toContainText('You are scheduled');
});


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
