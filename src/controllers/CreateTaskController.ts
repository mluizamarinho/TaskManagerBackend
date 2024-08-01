import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'

export class CreateTaskController {

    async handle(request: Request, response: Response){
        const {id, name, type, userID} = request.body;

        const task =  await PrismaClient.task.create({
            data: {
                id,
                name,
                type,
                userID
            }
        })
    }
        
    }

