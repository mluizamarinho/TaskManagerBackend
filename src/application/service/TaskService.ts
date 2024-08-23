import TaskRepository from '../../infrastructure/repository/TaskRepository';

class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    // Cria uma nova tarefa
    public async createTask(name: string, status: string, creationDate: string, conclusionDate?: string, userIds?: string[], boardId?: string) {
        try {
            const task = await this.taskRepository.createTask({
                name,
                status,
                creation_date: new Date(creationDate),
                conclusion_date: conclusionDate ? new Date(conclusionDate) : undefined,
                users: userIds ? { connect: userIds.map(id => ({ id })) } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });
            return task;
        } catch (error) {
            throw new Error(`Failed to create task`);
        }
    }

    // Retorna todas as tarefas
    public async getTasks() {
        try {
            const tasks = await this.taskRepository.findAllTasks();
            return tasks;
        } catch (error) {
            throw new Error(`Failed to fetch tasks`);
        }
    }

    // Retorna uma tarefa específica por ID
    public async getTaskById(id: string) {
        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Failed to fetch task by ID`);
        }
    }

    // Atualiza uma tarefa existente
    public async updateTask(id: string, name?: string, status?: string, creationDate?: string, conclusionDate?: string, userIds?: string[], boardId?: string) {
        try {
            const task = await this.taskRepository.updateTask(id, {
                name,
                status,
                creation_date: creationDate ? new Date(creationDate) : undefined,
                conclusion_date: conclusionDate ? new Date(conclusionDate) : undefined,
                users: userIds ? { connect: userIds.map(id => ({ id })) } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });
            return task;
        } catch (error) {
            throw new Error(`Failed to update task`);
        }
    }

    // Deleta uma tarefa por ID
    public async deleteTask(id: string) {
        try {
            const task = await this.taskRepository.deleteTask(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Failed to delete task`);
        }
    }
}

export default new TaskService();
