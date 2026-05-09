import { Router } from 'express';
import { createServiceController, getAllServicesController, getServiceByIdController, updateServiceController, deleteServiceController } from './services.controller.js';
import { authenticate, authorize } from '../auth/auth.middleware.js'
import { validateParams } from '../../common/middleware/validate.middleware.js';
import UUIDParams from '../../common/dto/uuidParams.dto.js';


const router: Router = Router();

router.post('/', authenticate, authorize('admin'), createServiceController)
router.get('/', getAllServicesController)
router.get('/:id', validateParams(UUIDParams), getServiceByIdController)
router.patch('/:id', authenticate, authorize('admin'), validateParams(UUIDParams), updateServiceController)
router.delete('/:id', authenticate, authorize('admin'), validateParams(UUIDParams), deleteServiceController)

export default router;
