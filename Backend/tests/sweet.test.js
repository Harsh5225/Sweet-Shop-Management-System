import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.models.js';
import Sweet from '../models/Sweet.models.js';

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

describe('Sweet and Inventory Endpoints', () => {
    let adminAgent;
    let userAgent;
    let sweetId;

    beforeAll(async () => {
        process.env.JWT_SECRET = 'testsecret123';
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        // Clean up database
        await User.deleteMany({});
        await Sweet.deleteMany({});

        // 1. Create and Login Admin
        await request(app).post('/api/auth/register').send({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });

        adminAgent = request.agent(app);
        await adminAgent.post('/api/auth/login').send({
            email: 'admin@example.com',
            password: 'password123'
        });

        // 2. Create and Login Normal User
        await request(app).post('/api/auth/register').send({
            name: 'Normal User',
            email: 'user@example.com',
            password: 'password123',
            role: 'user'
        });

        userAgent = request.agent(app);
        await userAgent.post('/api/auth/login').send({
            email: 'user@example.com',
            password: 'password123'
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Sweet.deleteMany({});
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Sweets Management', () => {
        it('should allow admin to create a sweet', async () => {
            const res = await adminAgent.post('/api/sweets').send({
                name: 'Chocolate Cake',
                category: 'Cake',
                price: 50,
                quantity: 10
            });

            expect(res.statusCode).toEqual(201);
            expect(res.body.name).toEqual('Chocolate Cake');
            sweetId = res.body._id; // Save ID for later tests
        });

        it('should not allow normal user to create a sweet', async () => {
            const res = await userAgent.post('/api/sweets').send({
                name: 'Forbidden Cookie',
                category: 'Cookie',
                price: 10,
                quantity: 10
            });

            expect(res.statusCode).toEqual(401);
        });

        it('should get all sweets', async () => {
            const res = await userAgent.get('/api/sweets');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should search for sweets', async () => {
            const res = await userAgent.get('/api/sweets/search?name=Cake');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0].name).toContain('Cake');
        });
    });

    describe('Inventory Operations', () => {
        it('should allow user to purchase a sweet', async () => {
            const res = await userAgent.post(`/api/sweets/${sweetId}/purchase`).send({
                quantity: 2
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body.remainingStock).toEqual(8); // 10 - 2
        });

        it('should fail purchase if not enough stock', async () => {
            const res = await userAgent.post(`/api/sweets/${sweetId}/purchase`).send({
                quantity: 100 // More than 8 available
            });

            expect(res.statusCode).toEqual(400);
        });

        it('should allow admin to restock a sweet', async () => {
            const res = await adminAgent.post(`/api/sweets/${sweetId}/restock`).send({
                quantity: 5
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body.currentStock).toEqual(13); // 8 + 5
        });
    });
});
