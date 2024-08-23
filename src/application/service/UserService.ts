import UserRepository from '../../infrastructure/repository/UserRepository';

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async createUser(name: string, type: string) {
        if (!name || !type) {
            throw new Error('Name and type are required');
        }

        return await this.userRepository.createUser({ name, type });
    }

    public async getUserById(id: string) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async updateUser(id: string, name?: string, type?: string) {
        if (!name && !type) {
            throw new Error('At least one field to update is required');
        }

        return await this.userRepository.updateUser(id, { name, type });
    }

    public async deleteUser(id: string) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return await this.userRepository.deleteUser(id);
    }

    public async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }
}

export default new UserService();
