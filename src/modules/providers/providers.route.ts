import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { getAllProvidersController, getProviderProfileController, singleProviderController, updateProviderProfileController, availabilityToggleController, addservicesController, verifyProviderController } from "./providers.controller.js";

const router:Router = Router()

router.get('/', getAllProvidersController)
router.get('/me', authenticate, authorize('provider'), getProviderProfileController)
router.get('/:id', authenticate, singleProviderController)
router.patch('/me', authenticate, authorize('provider'), updateProviderProfileController)
router.patch('/me/availabiltiy', authenticate, authorize('provider'), availabilityToggleController)
router.post('/me/services', authenticate, addservicesController)
router.get('/:id/service', authenticate)
router.delete('/me/:serviceId', authenticate)
router.patch('/:id/verify', authenticate , authorize('admin'), verifyProviderController)

export default router