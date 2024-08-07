import express, { Request, Response } from 'express';
import { CreateTaskController } from './controllers/CreateTaskController';
import { CreateUserController } from './controllers/CreateUserController';


const app = express();
const port = 3000;


app.use(express.json());

const createTask = new CreateTaskController();
const createUser = new CreateUserController();

app.post('/task', createTask.createTask);
app.post('/user', createUser.createUser);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
