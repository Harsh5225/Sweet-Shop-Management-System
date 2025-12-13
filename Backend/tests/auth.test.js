import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.models.js';

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'testsecret123';
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        // Clear users before starting
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.email).toEqual(userData.email);
    });

    it('should not register an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(res.statusCode).toEqual(400); // Bad Request
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(userData.email);
        // Check if JWT cookie is set
        const cookies = res.headers['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies[0]).toMatch(/jwt/);
    });

    it('should fail login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: userData.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });
});
