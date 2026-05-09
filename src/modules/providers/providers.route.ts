import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { getAllProvidersController, getProviderProfileController, singleProviderController, updateProviderProfileController, availabilityToggleController, addservicesController, verifyProviderController, deleteProviderServiceController, getProviderServicesController } from "./providers.controller.js";
import { validateParams } from "../../common/middleware/validate.middleware.js";
import UUIDParams from "../../common/dto/uuidParams.dto.js";

const router:Router = Router()

router.get('/', getAllProvidersController)
router.get('/me', authenticate, authorize('provider'), getProviderProfileController)
router.get('/:id', authenticate, validateParams(UUIDParams), singleProviderController)
router.patch('/me', authenticate, authorize('provider'), updateProviderProfileController)
router.patch('/me/availabiltiy', authenticate, authorize('provider'), availabilityToggleController)
router.post('/me/services', authenticate, authorize('provider'), addservicesController)
router.get('/:id/service', validateParams(UUIDParams), getProviderServicesController)
router.delete('/me/:id', authenticate, authorize('provider'), validateParams(UUIDParams), deleteProviderServiceController)
router.patch('/:id/verify', authenticate , authorize('admin'), validateParams(UUIDParams), verifyProviderController)

export default router