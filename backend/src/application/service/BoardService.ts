import BoardRepository from '../../infrastructure/repository/BoardRepository';

class BoardService {

public async createBoard(name: string, description: string, userId?: string) {
    try {
        const board = await BoardRepository.createBoard({
            name,
            description,
            users: userId ? { connect: [{ id: userId }] } : undefined
        });
        return board;
    } catch (error) {
        // Adicione a mensagem de erro original para melhor diagnóstico
        throw new Error(`Failed to create board`);
    }
}
    public async getBoards() {
        try {
            const boards = await BoardRepository.findAllBoards();
            return boards;
        } catch (error) {
            throw new Error(`Failed to fetch boards`);
        }
    }

    public async getBoardById(id: string) {
        try {
            const board = await BoardRepository.findBoardById(id);
            if (!board) {
                throw new Error('Board not found');
            }
            return board;
        } catch (error) {
            throw new Error(`Failed to fetch board by ID`);
        }
    }

    public async updateBoard(id: string, name?: string, description?: string, userId?: string) {
        try {
            const board = await BoardRepository.updateBoard(id, {
                name,
                description,
                users: userId ? { connect: { id: userId } } : undefined,  // Correção aqui
            });
            return board;
        } catch (error) {
            throw new Error(`Failed to update board`);
        }
    }

    public async deleteBoard(id: string) {
        try {
            const board = await BoardRepository.deleteBoard(id);
            if (!board) {
                throw new Error('Board not found');
            }
            return board;
        } catch (error) {
            throw new Error(`Failed to delete board`);
        }
    }
}

export default new BoardService();
