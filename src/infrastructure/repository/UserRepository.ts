import PrismaConnection from '../database/connection';
import { User, Prisma } from '@prisma/client';

class UserRepository {
    private prisma = PrismaConnection.getClient();

    public async findAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    public async findUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                tasks: true,
                boards: true
            }
        });
    }

    public async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    public async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    public async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}

export default new UserRepository;
