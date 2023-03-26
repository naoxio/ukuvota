import { test, expect, type Page } from '@playwright/test';

test('Form submission works correctly', async ({page}) => {
    await page.goto('http://localhost:3000');
  
    // fill out the form and submit it
    await page.type('input[name=topicQuestion]', 'What should we order tonight?');
    await page.type('textarea[name=topicDescription]', 'I would like to do a group decision on what to order.');
    await page.click('#submit');
  
    // check that the success alert is displayed
    await page.waitForSelector('#success-alert');
    const alertText = await page.$eval('#success-alert', (e) => e.innerHTML);
    expect(alertText).toBe('Process successfully created');
  });
  