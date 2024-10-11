import { Request, Response } from 'express';
import TaskRepository from '../../infrastructure/repository/TaskRepository';

class TaskController {
    

    // Cria uma nova tarefa
    public async createTask(req: Request, res: Response): Promise<Response> {
        const { name, status, userIds, boardId } = req.body;

        try {
            const task = await TaskRepository.createTask({
                name,
                status,
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
            const tasks = await TaskRepository.findAllTasks();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the tasks.' });
        }
    }

    // Retorna os detalhes de uma tarefa específica
    public async getTaskById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const task = await TaskRepository.findTaskById(id);
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
        const { name, status, userIds, boardId } = req.body;

        try {
            const task = await TaskRepository.updateTask(id, {
                name,
                status,
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
            const task = await TaskRepository.deleteTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while deleting the task.' });
        }
    }
}

export default new TaskController();
