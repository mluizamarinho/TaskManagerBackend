import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserRepository from '../../infrastructure/repository/UserRepository';

class UserController {
  
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, type, password } = req.body; 
        try {
            // Hash da senha usando bcrypt antes de salvar no banco de dados
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await UserRepository.createUser({ name, type, password: hashedPassword });
    
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
            console.error('Erro ao buscar usuários:', error);  
            return res.status(500).json({ error: 'Falha ao buscar usuários' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await UserRepository.findUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);  
            return res.status(500).json({ error: 'Falha ao buscar usuário' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, type, password } = req.body;  

        try {
            
            const user = await UserRepository.updateUser(id, { name, type, password });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error); 
            return res.status(500).json({ error: 'Falha ao atualizar usuário' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const user = await UserRepository.deleteUser(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);  // Corrige a saída de erro
            return res.status(500).json({ error: 'Falha ao deletar usuário' });
        }
    }
}

export default new UserController();
