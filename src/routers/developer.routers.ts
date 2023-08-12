import { Router } from "express";
import { deleteDeveloperController, getDevelopersController, patchDeveloperController, postDevelopersController, postInfosController } from "../controllers/developers.controller";

export const developRoutes: Router = Router()

developRoutes.post('', postDevelopersController)
developRoutes.get('/:id', getDevelopersController)
developRoutes.patch('/:id', patchDeveloperController)
developRoutes.delete('/:id', deleteDeveloperController)
developRoutes.post('/:id/infos', postInfosController)