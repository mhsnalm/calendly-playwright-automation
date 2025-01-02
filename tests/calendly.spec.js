// @ts-check
//const { test, expect } = require('@playwright/test');

import { test, expect } from '@playwright/test';
import moment from 'moment';
const { chromium } = require('playwright');

// Use Chromium browser for this test
test.use({ browserName: 'chromium' });

// Use the system-installed Chrome browser
const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';  // Change this path based on your system

test.use({ browserName: 'chromium', launchOptions: { executablePath: browserPath } });

test.setTimeout(90000);

// Define the input format for parsing
const inputFormat = "dddd, MMMM D, h:mma";

// Function to parse, convert to UTC, and format to ISO 8601
function formatToISO8601(inputStr) {
    console.log('Input String:', inputStr);
    const parsedDate = moment.parseZone(inputStr, inputFormat);
    if (!parsedDate.isValid()) {
        throw new Error("Invalid date format");
    }
    return parsedDate.utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
}


function formatToYearMonth(inputStr) {
    const parsedDate = moment.parseZone(inputStr, inputFormat);
    if (!parsedDate.isValid()) {
        throw new Error("Invalid date format");
    }
    return parsedDate.format("YYYY-MM");
}

// Function to parse and format to 'YYYY-MM-DD'
function formatToYearMonthDay(inputStr) {
    const parsedDate = moment.parseZone(inputStr, inputFormat);
    if (!parsedDate.isValid()) {
        throw new Error("Invalid date format");
    }
    return parsedDate.format("YYYY-MM-DD");
}

test('Schedule Calendly', async ({ page }) => {

  let transactionUrl = process.env.TRANSACTION_URL || '';
  const date = process.env.DATE || '';
  let time = process.env.TIME || '';
  const name = process.env.NAME || '';
  const email = process.env.EMAIL || '';
  const comments = process.env.COMMENTS || '';
  const fileId = process.env.FILE_ID || '';
  
//test values
//   let transactionUrl = "https://calendly.com/d/cpjn-hm6-fgs/notarycam-test-real-estate-appointment-30";
//   const date = "Tuesday, November 12";
//   const time = "7:30pm";
//   const name = "Mohsin Alam";
//   const email = "mohsin.alam@stewart.com";
//   const comments = "No comments";
//   const fileId = "9999999";

// time = time.replace(/\s+/g, '');
// time = moment(time, 'h:mma').format('h:mma');
  //await page.goto(transactionUrl);
  //await page.waitForTimeout(3000);
  
  const dateTime = date + ', ' + time;

  const iso8601DateTime = formatToISO8601(dateTime);
  transactionUrl = transactionUrl+'/'+iso8601DateTime+'?'+'month='+formatToYearMonth(dateTime)+'&timezone=UTC&date='+formatToYearMonthDay(dateTime);
  // Print the inputs to the console
  console.log('Transaction URL:', transactionUrl);
  //console.log('Date:', formattedDate);
  //console.log('Time:', formattedTime);
  console.log('Name:', name);
  console.log('Email:', email);
  //console.log('Comments:', comments);
  console.log('File ID:', fileId);

  await page.goto(transactionUrl);
//   await page.getByLabel(`${date} - Times`).click();
//   await page.locator('button', { hasText: date }).click();
//   await page.locator('button', { hasText: 'Next' }).click(); 
  await page.getByLabel('Name *').click();
  await page.waitForTimeout(1000);

  await page.getByLabel('Name *').pressSequentially(name, { delay: 100 });
  await page.waitForTimeout(800);
  await page.getByLabel('Name *').press('Tab');
  await page.waitForTimeout(900);
  await page.getByLabel('Email *').pressSequentially(email, { delay: 100 });
  await page.waitForTimeout(1000);
  await page.getByLabel('Email *').press('Tab');
  await page.waitForTimeout(1000);
  //await page.getByLabel('Please share anything that').click();
  //await page.getByLabel('Please share anything that').fill(comments);
  //await page.getByLabel('Please share anything that').press('Tab');
  await page.getByLabel('File ID *').pressSequentially(fileId, { delay: 100 });

  await page.waitForTimeout(2500);
  const banner = await page.getByRole('button', { name: 'I understand' }); // Cookie consent banner close
  if (await banner.isVisible()) {
      await banner.click();
  }

  //await page.waitForSelector('button', { state: 'visible', timeout: 90000 });
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Schedule Event' }).hover();
  await page.getByRole('button', { name: 'Schedule Event' }).focus();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Schedule Event' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('h1')).toContainText('You are scheduled');


});
