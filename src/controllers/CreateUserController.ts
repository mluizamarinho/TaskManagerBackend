import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'

export class CreateUserController {

    async createUser(request: Request, response: Response){
        const {id, name, type} = request.body;

        const prismaCliente = new PrismaClient();

        const user =  await prismaCliente.user.create({
            data: {
                id,
                name,
                type,
            }
        })
    }
        
    }