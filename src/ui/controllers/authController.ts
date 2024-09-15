
import { Request, Response } from 'express';
import AuthService from '../../application/service/AuthService';
//import { validateUserInput } from '../../application/domain/validator/userValidator';

// processam as requisições HTTP de registro e login, utilizando o AuthService.
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, password, type } = req.body;

    // recebe os dados do usuário e os valida. 
    // validateUserInput(name, password);
    await AuthService.registerUser(name, password, type);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
}
}

// processa o login e retorna um token JWT ao cliente se a autenticação for bem-sucedida.

export async function login(req: Request, res: Response): Promise<void> {
  try {

    const { id, password } = req.body;
    // validateUserInput(id, password);
    const token = await AuthService.authenticateUser(id, password);
    res.json({ token });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
}
}