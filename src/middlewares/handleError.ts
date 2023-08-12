import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const handleError = (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message})
    }

    console.error(err)
    return res.status(500).json({message: "Internal server error"})
}