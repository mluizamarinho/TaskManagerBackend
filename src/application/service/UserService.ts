import UserRepository from '../../infrastructure/repository/UserRepository';

class UserService {
    

    public async createUser(name: string, type: string) {
        if (!name || !type) {
            throw new Error('Name and type are required');
        }

        return await UserRepository.createUser({ name, type });
    }

    public async getUserById(id: string) {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async updateUser(id: string, name?: string, type?: string) {
        if (!name && !type) {
            throw new Error('At least one field to update is required');
        }

        return await UserRepository.updateUser(id, { name, type });
    }

    public async deleteUser(id: string) {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return await UserRepository.deleteUser(id);
    }

    public async getAllUsers() {
        return await UserRepository.findAllUsers();
    }
}

export default new UserService();
