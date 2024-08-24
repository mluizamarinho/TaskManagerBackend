import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repository/UserRepository';

class UserController {
  
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, type } = req.body;
        try {
            const user = await UserRepository.createUser({ name, type });
            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: user
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({
                message: 'Falha ao criar usuário',
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserRepository.findAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await UserRepository.findUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, type } = req.body;

        try {
            const user = await UserRepository.updateUser(id, { name, type });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const user = await UserRepository.deleteUser(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }
}

export default new UserController();
