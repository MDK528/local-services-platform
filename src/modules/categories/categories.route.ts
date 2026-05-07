import { Router } from 'express';
import { createCategoriesController, getAllCategoriesController, getCategoriesByIdController, updateCategoriesController, deleteCategoriesController } from './categories.controller.js';
import { authenticate, authorize } from "../auth/auth.middleware.js";

const router:Router = Router()

router.get('/', getAllCategoriesController)
router.post('/create', authenticate, authorize('admin'), createCategoriesController)
router.get('/:id', getCategoriesByIdController)
router.patch('/:id', authenticate, authorize('admin'), updateCategoriesController)
router.delete('/:id', authenticate, authorize('admin'), deleteCategoriesController)

export default router