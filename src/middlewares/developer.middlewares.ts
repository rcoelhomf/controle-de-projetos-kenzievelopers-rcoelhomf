import { NextFunction, Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../database/database'
import { AppError } from '../errors/app.error'

export const verifyIfEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body

    if(!email) return next()

    const queryResult: QueryResult = await client.query('SELECT * FROM "developers" WHERE "email" = $1;', [ email ])

    if(queryResult.rowCount) {
        throw new AppError('Email already exists.', 409)
    }
    
    return next()
}

export const verefyDeveloperExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const queryResult: QueryResult = await client.query('SELECT * FROM "developers" WHERE "id" = $1;', [ id ])

    if(!queryResult.rowCount) {
        throw new AppError('Developer not found.', 404)
    }

    return next()
}

export const verifyInfosExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const queryResult: QueryResult = await client.query('SELECT * FROM "developerInfos" WHERE "developerId" = $1;', [ id ])

    if(queryResult.rowCount) {
        throw new AppError('Developer infos already exists.', 409)
    }

    return next()
}

export const verifyOS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { preferredOS } = req.body

    if(preferredOS !== 'Windows' && preferredOS !== 'Linux' && preferredOS !== 'MacOS') {
        throw new AppError('Invalid OS option.', 400)
    }

    return next()
}