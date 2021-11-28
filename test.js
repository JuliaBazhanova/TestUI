const { test, expect } = require('@playwright/test');

// task #1
test.describe('automationpractice test', () => {
    test.beforeEach(async ({ page }) => {
        console.log("Login")
        await page.goto('http://automationpractice.com/');
        await page.click('a[class="login"]');
        await page.type('input[id="email"]', "k_yuliya@list.ru");
        await page.type('input[id="passwd"]', "Test1Test1");
        await page.click('button[id="SubmitLogin"]');
    });

    test('Logout Test action by UI', async ({ page }) => {
        console.log("Logout")
        await page.click('a[class="logout"]');
        await expect(page.locator('a[class="logout"]')).toBeHidden();
        await expect(page.locator('a[class="login"]')).toBeVisible();
    });

    test('Logout Test action by account/logout', async ({ page }) => {
        console.log("Account > Logout")
        await page.click('a[title="Sign out"]');
        await expect(page.locator('a[class="logout"]')).toBeHidden();
        await expect(page.locator('a[class="login"]')).toBeVisible();
    });
});