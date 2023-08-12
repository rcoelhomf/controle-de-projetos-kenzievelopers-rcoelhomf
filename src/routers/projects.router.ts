import { Router } from 'express'
import { getProjectController, patchProjectController, postProjectsCrotroller } from '../controllers/projects.controller'
import { verifyDeveloperIdExists, verifyProjectDeveloperIdExists, verifyProjectId } from '../middlewares/projects.middlewares'

export const projectRoutes: Router = Router()

projectRoutes.post('', verifyDeveloperIdExists, postProjectsCrotroller)
projectRoutes.get('/:id', verifyProjectId, getProjectController)
projectRoutes.patch('/:id', verifyProjectId, verifyProjectDeveloperIdExists, patchProjectController)