import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import TaskController from '../controllers/TaskController';
import UserController from '../controllers/UserController';
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;


app.use(express.json());


const router = Router();

// rotas de board
router.post('/boards', BoardController.createBoard);

router.get('/boards', BoardController.getBoards);

router.get('/boards/:id', BoardController.getBoardById);

router.put('/boards/:id', BoardController.updateBoard);

router.delete('/boards/:id', BoardController.deleteBoard);


// rotas de task 
router.post('/tasks', TaskController.createTask);

router.get('/tasks', TaskController.getTasks);

router.get('/tasks/:id', TaskController.getTaskById);

router.put('/tasks/:id', TaskController.updateTask);

router.delete('/tasks/:id', TaskController.deleteTask);

// rotas de user 

router.post('/user/register', UserController.createUser);

router.get('/users', UserController.getUsers);

router.get('/user/:id', UserController.getUserById)

router.put('/user/:id', UserController.updateUser)

router.delete('/user/:id', UserController.deleteUser)

app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  

export default router;
