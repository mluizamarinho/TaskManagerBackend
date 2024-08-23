import { Request, Response } from 'express';
import TaskRepository from '../../infrastructure/repository/TaskRepository';

class TaskController {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    // Cria uma nova tarefa
    public async createTask(req: Request, res: Response): Promise<Response> {
        const { name, status, creationDate, conclusionDate, userIds, boardId } = req.body;

        try {
            const task = await this.taskRepository.createTask({
                name,
                status,
                creation_date: new Date(creationDate),
                conclusion_date: new Date(conclusionDate),
                users: userIds && userIds.length > 0 ? { connect: userIds.map((id: string) => ({ id })) } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });

            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while creating the task.' });
        }
    }

    // Retorna todas as tarefas
    public async getTasks(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await this.taskRepository.findAllTasks();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the tasks.' });
        }
    }

    // Retorna os detalhes de uma tarefa específica
    public async getTaskById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the task.' });
        }
    }

    // Atualiza uma tarefa existente
    public async updateTask(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, status, creationDate, conclusionDate, userIds, boardId } = req.body;

        try {
            const task = await this.taskRepository.updateTask(id, {
                name,
                status,
                creation_date: creationDate ? new Date(creationDate) : undefined,
                conclusion_date: conclusionDate ? new Date(conclusionDate) : undefined,
                users: userIds && userIds.length > 0 ? { connect: userIds.map((id: string) => ({ id })) } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });

            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the task.' });
        }
    }

    // Deleta uma tarefa pelo ID
    public async deleteTask(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await this.taskRepository.deleteTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while deleting the task.' });
        }
    }
}

export default new TaskController();
