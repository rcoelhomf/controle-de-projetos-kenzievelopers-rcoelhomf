import { Request, Response } from "express"
import { createNewProject, getProjectById, updateProject } from "../services/projects.services"

export const postProjectsCrotroller = async (req: Request, res: Response): Promise<Response> => {
    const project = await createNewProject(req.body)

    return res.status(201).json(project)
}

export const getProjectController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const project = await getProjectById(Number(id))

    return res.status(200).json(project)
}

export const patchProjectController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const project = await updateProject(req.body, Number(id))

    return res.status(200).json(project)
}