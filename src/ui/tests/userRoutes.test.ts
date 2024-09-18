import request from 'supertest';
import express from 'express';
import router from '../routes/routes'; 

const app = express();
app.use(express.json());
app.use('/api', router);

describe('User Routes', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({
        username: 'newuser',
        password: 'password'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', 'colocar o token'); 
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a user by id', async () => {
    const response = await request(app)
      .get('/api/user/1') 
      .set('Authorization', 'colocar o token'); 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(1); 
  });

  it('should update a user', async () => {
    const response = await request(app)
      .put('/api/user/1') 
      .set('Authorization', 'colocar o token') 
      .send({
        username: 'updateduser',
        password: 'newpassword'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('updateduser');
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .delete('/api/user/1') 
      .set('Authorization', 'colocar o token'); 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User deleted successfully');
  });
});


it('should return 400 if username or password is missing', async () => {
    const response = await request(app)
      .post('/api/user/register')
      .send({ username: '' });  // Faltando password
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username and password are required');
  });
  
  it('should return 400 if the username is already taken', async () => {
    await request(app)
      .post('/api/user/register')
      .send({ username: 'newuser', password: 'password' });
  
    const response = await request(app)
      .post('/api/user/register')
      .send({ username: 'newuser', password: 'password' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username already exists');
  });


  // Quando o ID fornecido não é um número válido ou não existe.
  it('should return 400 if user ID is not valid', async () => {
    const response = await request(app)
      .get('/api/user/notAnId')
      .set('Authorization', 'colocar o token');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid user ID');
  });
  
  it('should return 404 if user ID does not exist', async () => {
    const response = await request(app)
      .get('/api/user/999')  // Suponha que este ID não exista
      .set('Authorization', 'colocar o token');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });
  

  // Quando se tenta deletar um usuário que não existe.

  it('should return 404 if trying to delete a non-existent user', async () => {
    const response = await request(app)
      .delete('/api/user/999')  // Suponha que este ID não exista
      .set('Authorization', 'colocar o token');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });
  