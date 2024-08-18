import { PrismaClient } from '@prisma/client';


class PrismaConnection {
    private static instance: PrismaClient;

    private constructor() {}

    public static getClient(): PrismaClient {
        if (!PrismaConnection.instance) {
            PrismaConnection.instance = new PrismaClient();
        }
        return PrismaConnection.instance;
    }
}

export default PrismaConnection;