import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'

export class CreateTaskController {

    async createTask(request: Request, response: Response){
        const {id, name, type, userID} = request.body;

        const prismaClient = new PrismaClient();

        const task =  await prismaClient.task.create({
            data: {
                id,
                name,
                type,
                userID
            }
        })
    }
        
    }

