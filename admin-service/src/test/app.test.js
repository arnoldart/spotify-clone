import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../';

describe("GET /api/v1/album/new", () => {
    it('should return pong', async () => {
        const res = await request(app).get('/api/v1/album/new');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('pong');
    });
})