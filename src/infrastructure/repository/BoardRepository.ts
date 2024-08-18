import PrismaConnection from '../connection';
import { Board, Prisma } from '@prisma/client';

class BoardRepository {
    private prisma = PrismaConnection.getClient();

    public async findAllBoards(): Promise<Board[]> {
        return this.prisma.board.findMany();
    }

    public async findBoardById(id: string): Promise<Board | null> {
        return this.prisma.board.findUnique({
            where: { id },
            include: {
                user: true,
                tasks: true
            }
        });
    }

    public async createBoard(data: Prisma.BoardCreateInput): Promise<Board> {
        return this.prisma.board.create({
            data,
        });
    }

    public async updateBoard(id: string, data: Prisma.BoardUpdateInput): Promise<Board> {
        return this.prisma.board.update({
            where: { id },
            data,
        });
    }

    public async deleteBoard(id: string): Promise<Board> {
        return this.prisma.board.delete({
            where: { id },
        });
    }
}

export default BoardRepository;
