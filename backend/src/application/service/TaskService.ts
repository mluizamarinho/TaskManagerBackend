import TaskRepository from '../../infrastructure/repository/TaskRepository';

class TaskService {


    // Cria uma nova tarefa
    public async createTask(name: string, status: string, userIds?: string[], boardId?: string) {
        try {
            const task = await TaskRepository.createTask({
                name,
                status,  // "status" agora deve ser passado corretamente
                users: userIds ? { connect: userIds.map(id => ({ id })) } : undefined,
                board: boardId ? { connect: { id: boardId } } : undefined,
            });
            return task;
        } catch (error) {
            throw new Error('Failed to create task'); 
    }
}
    

    // Retorna todas as tarefas
    public async getTasks() {
        try {
            const tasks = await TaskRepository.findAllTasks();
            return tasks;
        } catch (error) {
            throw new Error(`Failed to fetch tasks`);
        }
    }

    // Retorna uma tarefa específica por ID
    public async getTaskById(id: string) {
        try {
            const task = await TaskRepository.findTaskById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            throw new Error(`Failed to fetch task by ID`);
        }
    }

    // Atualiza uma tarefa existente
    public async updateTask(id: string, name?: string, status?: string, userIds?: string[], boardId?: string) {
        try {
            const task = await TaskRepository.updateTask(id, {
                name,
                status,
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
            const task = await TaskRepository.deleteTask(id);
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
