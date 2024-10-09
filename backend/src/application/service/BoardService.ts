import BoardRepository from '../../infrastructure/repository/BoardRepository';

class BoardService {

    public async createBoard(name: string, description: string, creationDate: string, userId?: string) {
        try {
            const board = await BoardRepository.createBoard({
                name,
                description,
                creation_date: new Date(creationDate),
                users: userId ? { connect: { id: userId } } : undefined,  // Correção aqui
            });
            return board;
        } catch (error) {
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

    public async updateBoard(id: string, name?: string, description?: string, creationDate?: string, userId?: string) {
        try {
            const board = await BoardRepository.updateBoard(id, {
                name,
                description,
                creation_date: creationDate ? new Date(creationDate) : undefined,
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
