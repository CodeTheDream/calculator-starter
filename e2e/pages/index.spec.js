const { test, expect } = require('@playwright/test');

test('basic calculator functionality with add', async ({ page }) => {
    await page.goto("/");
    await page.type("#first", "1");
    await page.type("#second", "2");
    await page.click("#operation");
    await page.locator("#operation").selectOption("add");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText("3");
});

test('basic calculator functionality with subtract', async ({ page }) => {
    await page.goto("/");
    await page.type("#first", "2");
    await page.type("#second", "2");
    await page.click("#operation");
    await page.locator("#operation").selectOption("subtract");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText("0");
});

test('basic calculator functionality with multiply', async ({ page }) => {
    await page.goto("/");
    await page.type("#first", "2");
    await page.type("#second", "2");
    await page.click("#operation");
    await page.locator("#operation").selectOption("multiply");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText("4");
});

test('basic calculator functionality with divide', async ({ page }) => {
    await page.goto("/");
    await page.type("#first", "2");
    await page.type("#second", "2");
    await page.click("#operation");
    await page.locator("#operation").selectOption("divide");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText("1");
});

test('Contains an error when first is not provided', async ({ page }) => {
    await page.goto('/');
    await page.type('#second', '2');
    await page.click("#operation");
    await page.locator("#operation").selectOption("add");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText(`Query params should have 3 items. Received 2: add,2`);
})

test('Contains an error when second is not provided', async ({ page }) => {
    await page.goto('/');
    await page.type('#first', '4');
    await page.click("#operation");
    await page.locator("#operation").selectOption("add");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText(`Query params should have 3 items. Received 2: add,4`);
})

test('Contains an error when operation is not provided', async ({ page }) => {
    await page.goto('/');
    await page.type('#first', '3');
    await page.type('#second', '3');
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText(`Query params should have 3 items. Received 2: 3,3`);
})

test('Contains an error when first and secons are NaN', async ({ page }) => {
    await page.goto("/");
    await page.type("#first", "a");
    await page.type("#second", "b");
    await page.click("#operation");
    await page.locator("#operation").selectOption("add");
    await page.click('button[type="submit"]');

    const result = page.locator("#result");
    await expect(result).toContainText("Failed to process query params. Received: add,a,b");
});