const { test, expect } = require('@playwright/test');

// task #1
test.describe('automationpractice test', () => {
    test.beforeEach(async ({page}) => {
        console.log("Login")
        await page.goto('http://automationpractice.com/');
        await page.click('a[class="login"]');
        await page.type('input[id="email"]', "k_yuliya@list.ru");
        await page.type('input[id="passwd"]', "Test1Test1");
        await page.click('button[id="SubmitLogin"]');
    });

    test('Logout Test action by UI', async ({page}) => {
        console.log("Logout")
        await page.click('a[class="logout"]');
        await expect(page.locator('a[class="logout"]')).toBeHidden();
        await expect(page.locator('a[class="login"]')).toBeVisible();
    });

    test('Logout Test action by account/logout', async ({page}) => {
        console.log("Account > Logout")
        await page.click('a[title="Sign out"]');
        await expect(page.locator('a[class="logout"]')).toBeHidden();
        await expect(page.locator('a[class="login"]')).toBeVisible();
    });
});

// task #2
test.describe('levelsleep test', () => {
    test('Purchase mattress', async ({page}) => {
        console.log("Step 1. Navigate to https://www.levelsleep.com/");
        await page.goto('https://www.levelsleep.com/');
        await page.locator('a[data-testid="logo"]').waitFor();
        let isModalVisible = await page.isVisible('.cf-overlay-boxed');
        if (isModalVisible) {
            await page.click('div .cf-cta-close');
        }

        console.log("Step 2. Click on 'Shop mattress' button")
        await page.click('a[data-testid="shop_mattress_button"]');
        await expect(page.url().endsWith("/mattress"));

        console.log("Step 3. Click on 'Add to Cart' button");
        isModalVisible = await page.isVisible('.cf-overlay-boxed');
        if (isModalVisible) {
            await page.click('div .cf-cta-close');
        }
        await page.click('button[data-testid="addtocart_btn"]');
        await page.locator('#email').waitFor();
        await expect(page.url().endsWith("checkout/shipping"));

        console.log("Step 4. Fill out the required fields");
        let email = "test@mail.ru";
        await page.focus('#email');
        await page.type('#email', email);
        await expect(page.locator('#email')).toHaveValue(email);

        let userName = "Test User";
        await page.focus('#shippingAddress_fullName');
        await page.type('#shippingAddress_fullName', userName);
        await expect(page.locator('#shippingAddress_fullName')).toHaveValue(userName);

        let address = "775 Westminster Avenue";
        await page.focus('#shippingAddress_line1');
        await page.type('#shippingAddress_line1', address);
        await expect(page.locator('#shippingAddress_line1')).toHaveValue(address);

        let city = "Brooklyn";
        await page.focus('#shippingAddress_city');
        await page.type('#shippingAddress_city', city);
        await expect(page.locator('#shippingAddress_city')).toHaveValue(city);

        let state = "NY";
        await page.selectOption('#shippingAddress_state', state);
        await expect(page.locator('#shippingAddress_state')).toHaveValue(state);

        let zipCode = "11201";
        await page.focus('#shippingAddress_zip');
        await page.type('#shippingAddress_zip', zipCode);
        await expect(page.locator('#shippingAddress_zip')).toHaveValue(zipCode);

        let phone = "3434341343";
        let expectedPhone = "(343) 434-1343";
        await page.focus('#shippingAddress_phone');
        await page.type('#shippingAddress_phone', phone);
        await expect(page.locator('#shippingAddress_phone')).toHaveValue(expectedPhone);

        console.log("Step 5. Click on 'Continue billing' button");
        await page.click('#checkout_shipping_continue_btn');

        // verify that user has been presented with the billing step and 'review purchase' button exists
        await expect(page.url().endsWith("checkout/billing"));
        await expect(page.locator('#checkout_payment_continue_btn')).toBeVisible();
        await page.screenshot({path: 'billing.png'});
    });
});