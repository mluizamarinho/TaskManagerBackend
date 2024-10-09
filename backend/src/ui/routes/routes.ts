import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import TaskController from '../controllers/TaskController';
import UserController from '../controllers/UserController';
import { register, login } from '../controllers/authController';
import { authenticateToken, authorizeRoles } from './authMiddleware';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const router = Router();

// Rotas de Board (protegidas para scrummasters)
router.post('/boards/register', authenticateToken, authorizeRoles(['scrummaster']), BoardController.createBoard);
router.get('/boards', authenticateToken, authorizeRoles(['scrummaster']), BoardController.getBoards);
router.get('/boards/:id', authenticateToken, authorizeRoles(['scrummaster']), BoardController.getBoardById);
router.put('/boards/:id', authenticateToken, authorizeRoles(['scrummaster']), BoardController.updateBoard);
router.delete('/boards/:id', authenticateToken, authorizeRoles(['scrummaster']), BoardController.deleteBoard);

// Rotas de Task (protegidas para scrummasters)
router.post('/tasks', authenticateToken, TaskController.createTask);
router.get('/tasks', authenticateToken, TaskController.getTasks);
router.get('/tasks/:id',  TaskController.getTaskById);
router.put('/tasks/:id', authenticateToken, authorizeRoles(['scrummaster']), TaskController.updateTask);
router.delete('/tasks/:id', authenticateToken, TaskController.deleteTask);

// Rotas de User (não protegidas, mas podem ser adicionadas proteção conforme necessário)
router.post('/user/register', UserController.createUser);
router.get('/users', authenticateToken,authorizeRoles(['scrummaster']), UserController.getUsers);
router.get('/user/:id', authenticateToken, UserController.getUserById);
router.put('/user/:id', authenticateToken, UserController.updateUser);
router.delete('/user/:id', authenticateToken, UserController.deleteUser);

// Novas rotas de autenticação
router.post('/register', register);
router.post('/login', login);

// Rota protegida geral
router.get('/protected', authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.json({ message: 'Você está autenticado!', user });
});

app.use('/api', router);

export default router;
