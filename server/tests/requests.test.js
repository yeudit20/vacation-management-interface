import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/db/knex.js';

beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test('health endpoint works', async () => {
  const res = await request(app).get('/api/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('create and fetch a vacation request', async () => {
  const create = await request(app)
    .post('/api/requests')
    .send({ user_id: 1, start_date: '2025-01-10', end_date: '2025-01-12', reason: 'Family trip' });
  expect(create.status).toBe(201);

  const list = await request(app).get('/api/requests').query({ user_id: 1 });
  expect(list.status).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body.length).toBeGreaterThan(0);
});

test('approve then reject flows', async () => {
  const { body: created } = await request(app)
    .post('/api/requests')
    .send({ user_id: 1, start_date: '2025-02-01', end_date: '2025-02-05' });

  const approve = await request(app).post(`/api/requests/${created.id}/approve`).send();
  expect(approve.status).toBe(200);
  expect(approve.body.status).toBe('Approved');

  const reject = await request(app).post(`/api/requests/${created.id}/reject`).send({ comments: 'Overlap' });
  expect(reject.status).toBe(200);
  expect(reject.body.status).toBe('Rejected');
  expect(reject.body.comments).toBe('Overlap');
});

