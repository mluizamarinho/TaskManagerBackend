import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repository/UserRepository';

class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, type } = req.body;
        try {
            const user = await this.userRepository.createUser({ name, type });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: console.error('deu erro') });
        }
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userRepository.findAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: console.error() });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await this.userRepository.findUserById(id);
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
            const user = await this.userRepository.updateUser(id, { name, type });
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
            const user = await this.userRepository.deleteUser(id);
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
