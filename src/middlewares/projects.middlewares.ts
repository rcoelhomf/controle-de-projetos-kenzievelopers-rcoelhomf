import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database/database";
import { AppError } from "../errors/app.error";

export const verifyDeveloperIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { developerId } = req.body

    if(!developerId) return next()

    const queryResult: QueryResult = await client.query('SELECT * FROM "developers" WHERE "id" = $1;', [ developerId ])
    
    if(!queryResult.rowCount) {
        throw new AppError('Developer not found.', 404)
    }

    return next()
}

export const verifyProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const queryResult: QueryResult = await client.query('SELECT * FROM "projects" WHERE "id" = $1;', [ id ])

    if(!queryResult.rowCount) {
        throw new AppError('Project not found.', 404)
    }

    return next()
}

export const verifyProjectDeveloperIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { developerId } = req.body

    if(!developerId) return next()

    const queryResult: QueryResult = await client.query('SELECT * FROM "developers" WHERE "id" = $1;', [ developerId ])

    if(!queryResult.rowCount) {
        throw new AppError('Developer not found.', 404)
    }

    return next()
}