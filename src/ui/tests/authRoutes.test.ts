import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; 

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'newuser',
        password: 'password'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'newuser',
        password: 'password'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
