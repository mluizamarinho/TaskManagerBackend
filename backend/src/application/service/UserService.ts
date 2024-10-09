import bcrypt from 'bcryptjs';
import UserRepository from '../../infrastructure/repository/UserRepository';

class UserService {
  // Método para criar um novo usuário
  public async createUser(name: string, password: string, type: string) {
    if (!name || !password || !type) {
      throw new Error('Name, password, and type are required');
    }

    return await UserRepository.createUser({ name, password, type });
  }

  // Método para buscar um usuário por ID
  public async getUserById(id: string) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Método para atualizar um usuário
  public async updateUser(id: string, name?: string, password?: string, type?: string) {
    if (!name && !password && !type) {
      throw new Error('At least one field to update is required');
    }

    // Se a senha for fornecida, deve ser hasheada
    let updateData: { name?: string; password?: string; type?: string } = { name, type };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    return await UserRepository.updateUser(id, updateData);
  }

  // Método para deletar um usuário
  public async deleteUser(id: string) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return await UserRepository.deleteUser(id);
  }

  // Método para obter todos os usuários
  public async getAllUsers() {
    return await UserRepository.findAllUsers();
  }
}

export default new UserService();
