import { Request, Response, Router } from 'express';
import BoardRepository from '../../infrastructure/repository/BoardRepository';

class BoardController {


    public async createBoard(req: Request, res: Response): Promise<Response> {
        const { name, description, creationDate, userIds } = req.body;

        try {
            const board = await BoardRepository.createBoard({
                name,
                description,
                creation_date: new Date(creationDate),
                users: userIds && userIds.length > 0 ? { connect: userIds.map((id: string) => ({ id })) } : undefined,
            });

            return res.status(201).json(board);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while creating the board.' });
        }
    }

    public async getBoards(req: Request, res: Response): Promise<Response> {
        try {
            const boards = await BoardRepository.findAllBoards();
            return res.status(200).json(boards);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the boards.' });
        }
    }

    public async getBoardById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const board = await BoardRepository.findBoardById(id);
            if (!board) {
                return res.status(404).json({ error: 'Board not found' });
            }
            return res.status(200).json(board);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the board.' });
        }
    }

    public async updateBoard(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, description, creationDate, userIds } = req.body;

        try {
            const board = await BoardRepository.updateBoard(id, {
                name,
                description,
                creation_date: creationDate ? new Date(creationDate) : undefined,
                users: userIds && userIds.length > 0 ? { connect: userIds.map((id: string) => ({ id })) } : undefined,
            });

            return res.status(200).json(board);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the board.' });
        }
    }

    public async deleteBoard(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const board = await BoardRepository.deleteBoard(id);
            return res.status(200).json(board);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while deleting the board.' });
        }
    }
}

export default new BoardController();



