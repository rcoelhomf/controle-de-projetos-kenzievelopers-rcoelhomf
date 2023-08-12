import { Request, Response } from "express";
import { dropDeveloper, getDeveloperInfo, insertDeveloperInfo, registerNewDeveloper, updateDeveloper } from "../services/developers.services";

export const postDevelopersController = async (req: Request, res: Response): Promise<Response> => {
    const developer = await registerNewDeveloper(req.body)

    return res.status(201).json(developer)
}

export const getDevelopersController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const developer = await getDeveloperInfo(Number(id))

    return res.status(200).json(developer)
}

export const patchDeveloperController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const developer = await updateDeveloper(req.body, Number(id))

    return res.status(200).json(developer)
}

export const deleteDeveloperController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    await dropDeveloper(Number(id))

    return res.status(204).json()
}

export const postInfosController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const infos = await insertDeveloperInfo(req.body, Number(id))

    return res.status(201).json(infos)
}