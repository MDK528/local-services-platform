import { Router } from 'express'
import { authenticate, authorize } from '../auth/auth.middleware.js'
import { validate, validateParams } from '../../common/middleware/validate.middleware.js'
import UUIDParams from '../../common/dto/uuidParams.dto.js'
import { CreateCategoryDto, UpdateCategoryDto, CreateServiceDto, UpdateServiceDto } from './dto/admin.dto.js'
import {
    getAllCategoriesController, createCategoryController, updateCategoryController, deleteCategoryController,
    getAllServicesController, createServiceController, updateServiceController, deleteServiceController,
    getAllBookingsController, forceCancelBookingController,
    verifyProviderController,
} from './admin.controller.js'

const router: Router = Router()


router.use(authenticate, authorize('admin'))
router.get('/categories', getAllCategoriesController)
router.post('/categories', validate(CreateCategoryDto), createCategoryController)
router.patch('/categories/:id', validateParams(UUIDParams), validate(UpdateCategoryDto), updateCategoryController)
router.delete('/categories/:id', validateParams(UUIDParams), deleteCategoryController)
router.get('/services', getAllServicesController)
router.post('/services', validate(CreateServiceDto), createServiceController)
router.patch('/services/:id', validateParams(UUIDParams), validate(UpdateServiceDto), updateServiceController)
router.delete('/services/:id', validateParams(UUIDParams), deleteServiceController)
router.get('/bookings', getAllBookingsController)
router.patch('/bookings/:id/cancel', validateParams(UUIDParams), forceCancelBookingController)
router.patch('/providers/:id/verify', validateParams(UUIDParams), verifyProviderController)

export default router