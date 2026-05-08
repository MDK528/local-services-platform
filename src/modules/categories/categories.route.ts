import { Router } from 'express';
import { createCategoriesController, getAllCategoriesController, getCategoriesByIdController, updateCategoriesController, deleteCategoriesController } from './categories.controller.js';
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { validateParams } from '../../common/middleware/validate.middleware.js';
import UUIDParams from './dto/uuidParams.dto.js';

const router:Router = Router()

router.get('/', getAllCategoriesController)
router.post('/', authenticate, authorize('admin'), createCategoriesController)
router.get('/:id', validateParams(UUIDParams), getCategoriesByIdController)
router.patch('/:id', authenticate, authorize('admin'), validateParams(UUIDParams), updateCategoriesController)
router.delete('/:id', authenticate, authorize('admin'), validateParams(UUIDParams), deleteCategoriesController)

export default router