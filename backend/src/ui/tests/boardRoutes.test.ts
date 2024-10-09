import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Board Routes', () => {
  it('should create a board', async () => {
    const response = await request(app)
      .post('/api/boards/register')
      .set('Authorization', 'Bearer fake-token') // Substitua pelo token de autenticação real
      .send({
        name: 'New Board'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get boards', async () => {
    const response = await request(app)
      .get('/api/boards')
      .set('Authorization', 'Bearer fake-token'); // Substitua pelo token de autenticação real
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a board by id', async () => {
    const response = await request(app)
      .get('/api/boards/1') // Substitua por um ID de board válido
      .set('Authorization', 'Bearer fake-token'); // Substitua pelo token de autenticação real
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(1); // Substitua por um ID de board válido
  });

  it('should update a board', async () => {
    const response = await request(app)
      .put('/api/boards/1') // Substitua por um ID de board válido
      .set('Authorization', 'Bearer fake-token') // Substitua pelo token de autenticação real
      .send({
        name: 'Updated Board Name'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Updated Board Name');
  });

  it('should delete a board', async () => {
    const response = await request(app)
      .delete('/api/boards/1') // Substitua por um ID de board válido
      .set('Authorization', 'Bearer fake-token'); // Substitua pelo token de autenticação real
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Board deleted successfully');
  });
});
