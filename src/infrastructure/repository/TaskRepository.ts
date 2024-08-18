import PrismaConnection from '../connection';
import { Task, Prisma } from '@prisma/client';

class TaskRepository {
    private prisma = PrismaConnection.getClient();

    public async findAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    public async findTaskById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
            include: {
                user: true,
                board: true
            }
        });
    }

    public async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
        });
    }

    public async updateTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    public async deleteTask(id: string): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}

export default TaskRepository;
