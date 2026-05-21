import { test, expect} from  '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev')

    //expected title contats playwright
    await expect(page).toHaveTitle(/playwright/)
});