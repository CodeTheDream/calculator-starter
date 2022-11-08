const { test, expect } = require('@playwright/test');

test.describe("API testing", () => {

    test("addition", async ({ request }) => {
        const result = await request.get('/api/calculate/add/1/1', {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({ result: 2 });
    });

    test("subtracting", async ({ request }) => {
        const result = await request.get('/api/calculate/subtract/1/1', {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({ result: 0 });
    });

    test("multiplying", async ({ request }) => {
        const result = await request.get('/api/calculate/multiply/1/1', {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({ result: 1 });
    });

    test("division", async ({ request }) => {
        const result = await request.get('/api/calculate/divide/4/2', {});
        expect(result.ok()).toBeTruthy();
        expect(await result.json()).toEqual({ result: 2 });
    });

    test("wrong operation to request", async ({ request }) => {
        const result = await request.get('/api/calculate/wrong/4/2', {});
        expect(result.status(500));
        expect(await result.json()).toEqual({ message: `Unsupported operation wrong` })
    });

    test("wrong query params - only one number", async ({ request }) => {
        const result = await request.get('/api/calculate/add/2', {});
        expect(result.status(500));
        expect(await result.json()).toEqual({ message: `Query params should have 3 items. Received 2: add,2` })
    });

    test("wrong query params - no operation", async ({ request }) => {
        const result = await request.get('/api/calculate/2/2', {});
        expect(result.status(500));
        expect(await result.json()).toEqual({ message: `Query params should have 3 items. Received 2: 2,2` })
    });

    test("wrong query params - no params", async ({ request }) => {
        const result = await request.get('/api/calculate/', {});
        expect(result.status(500));
        // expect(await result.json()).toEqual({ message: `Query params should have 3 items. Received 0: "",` })
    });
});