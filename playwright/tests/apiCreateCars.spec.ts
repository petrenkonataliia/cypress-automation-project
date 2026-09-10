import { test, expect } from '@playwright/test';

test.describe('Task 2: API POST /api/cars', () => {
    test('Positive: Create car with valid brandId, modelId, and mileage', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: { carBrandId: 1, carModelId: 1, mileage: 120 }
        });
        expect(response.status()).toBe(201);
    });

    test('Negative: Fail to create car with non-existent carBrandId', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: { carBrandId: 9999, carModelId: 1, mileage: 120 }
        });
        expect(response.status()).toBe(404);
    });

    test('Negative: Fail to create car when carModelId does not match carBrandId', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: { carBrandId: 1, carModelId: 9999, mileage: 120 }
        });
        expect(response.status()).toBe(404);
    });

    test('Negative: Fail to create car when required field (mileage) is missing', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: { carBrandId: 1, carModelId: 1 }
        });
        expect(response.status()).toBe(400);
    });

    test('Negative: Fail to create car with negative mileage value', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: { carBrandId: 1, carModelId: 1, mileage: -50 }
        });
        expect(response.status()).toBe(400);
    });
});