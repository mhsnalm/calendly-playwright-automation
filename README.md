# playwright-automation


## Initialize a playwright repo
npm init playwright@latest

## Verify playwright version
npm playwright -v

## Run all tests
npx playwright test

## Run specific test file
npx playwright test example.spec.js

## Run tests specifically using chromium
npx playwright test --project=chromium


## Run in headed mode
The command npx playwright test --headed runs tests in headed mode, meaning the browser will be visible during the test execution.

npx playwright test --headed

## Show test report
npx playwright show-report

