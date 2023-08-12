import { Router } from 'express'
import { deleteDeveloperController, getDevelopersController, patchDeveloperController, postDevelopersController, postInfosController } from '../controllers/developers.controller'
import { verefyDeveloperExists, verifyIfEmailExists, verifyInfosExists, verifyOS } from '../middlewares/developer.middlewares'

export const developRoutes: Router = Router()

developRoutes.post('', verifyIfEmailExists, postDevelopersController)
developRoutes.get('/:id', verefyDeveloperExists, getDevelopersController)
developRoutes.patch('/:id', verefyDeveloperExists, verifyIfEmailExists, patchDeveloperController)
developRoutes.delete('/:id', verefyDeveloperExists, deleteDeveloperController)
developRoutes.post('/:id/infos', verefyDeveloperExists, verifyOS, verifyInfosExists, postInfosController)