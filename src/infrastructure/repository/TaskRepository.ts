import PrismaConnection from '../database/connection';
import { Task, Prisma } from '@prisma/client';

class TaskRepository {
    private prisma = PrismaConnection.getClient();

    // Retorna todas as tarefas
    public async findAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany({
            include: {
                users: true,  // Inclui os usuários associados
                board: true,  // Inclui o board associado
            },
        });
    }

    // Retorna uma tarefa específica por ID
    public async findTaskById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
            include: {
                users: true,  // Inclui os usuários associados
                board: true,  // Inclui o board associado
            },
        });
    }

    // Cria uma nova tarefa
    public async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data: {
                ...data,
                users: {
                    connect: data.users?.connect || []
                },
            },
        });
    }

    // Atualiza uma tarefa existente
    public async updateTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data: {
                ...data,
                users: {
                    connect: data.users?.connect || []
                },
            },
        });
    }

    // Deleta uma tarefa por ID
    public async deleteTask(id: string): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}

export default TaskRepository;
