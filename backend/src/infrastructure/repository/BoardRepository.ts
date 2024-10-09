import PrismaConnection from '../database/connection';
import { Board, Prisma } from '@prisma/client';

class BoardRepository {
    private prisma = PrismaConnection.getClient();

    // Retorna todos os boards
    public async findAllBoards(): Promise<Board[]> {
        return this.prisma.board.findMany({
            include: {
                users: true,  // Inclui os usuários associados
                tasks: true
            }
        });
    }

    // Retorna um board específico por ID
    public async findBoardById(id: string): Promise<Board | null> {
        return this.prisma.board.findUnique({
            where: { id },
            include: {
                users: true,  // Inclui os usuários associados
                tasks: true
            }
        });
    }

    // Cria um novo board
    public async createBoard(data: Prisma.BoardCreateInput): Promise<Board> {
        return this.prisma.board.create({
            data: {
                ...data,
                users: {
                    connect: data.users?.connect || []
                },
            },
        });
    }

    // Atualiza um board existente
    public async updateBoard(id: string, data: Prisma.BoardUpdateInput): Promise<Board> {
        return this.prisma.board.update({
            where: { id },
            data: {
                ...data,
                users: {
                    connect: data.users?.connect || []
                },
            },
        });
    }

    // Deleta um board por ID
    public async deleteBoard(id: string): Promise<Board> {
        return this.prisma.board.delete({
            where: { id },
        });
    }
}

export default new BoardRepository;
