import { Request, Response } from 'express';
import TaskRepository from '../../infrastructure/repository/TaskRepository';

class TaskController {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    // Cria uma nova tarefa
    public async createTask(req: Request, res: Response): Promise<Response> {
        const { name, status, creationDate, conclusionDate, userId, boardId } = req.body;

        try {
            const task = await this.taskRepository.createTask({
                name,
                status,
                creation_date: new Date(creationDate),
                conclusion_date: new Date(conclusionDate),
                user: userId ? { connect: { id: userId } } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });

            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    // Recupera todas as tarefas
    public async getTasks(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await this.taskRepository.findAllTasks();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    // Recupera uma tarefa pelo ID
    public async getTaskById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: console.error()});
        }
    }

    // Atualiza uma tarefa pelo ID
    public async updateTask(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, status, creationDate, conclusionDate, userId, boardId } = req.body;

        try {
            const task = await this.taskRepository.updateTask(id, {
                name,
                status,
                creation_date: creationDate ? new Date(creationDate) : undefined,
                conclusion_date: conclusionDate ? new Date(conclusionDate) : undefined,
                user: userId ? { connect: { id: userId } } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });

            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({error: console.error()});
        }
    }

    // Deleta uma tarefa pelo ID
    public async deleteTask(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await this.taskRepository.deleteTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }
}

export default new TaskController();
