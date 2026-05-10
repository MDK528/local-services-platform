import { Router } from 'express';
import { authenticate, authorize } from '../auth/auth.middleware.js';
import { createBookingController, getBookingsController, getBookingByIdController, updateBookingStatusController } from './booking.controller.js';
import { validate, validateParams } from '../../common/middleware/validate.middleware.js';
import UUIDParams from '../../common/dto/uuidParams.dto.js';
import { BookingDto } from './dto/booking.dto.js';


const router: Router = Router();

router.post('/', authenticate, authorize('customer'), validate(BookingDto), createBookingController)
router.get('/', authenticate, getBookingsController)
router.get('/:id', authenticate, validateParams(UUIDParams), getBookingByIdController)
router.patch('/:id/status', authenticate, validateParams(UUIDParams), updateBookingStatusController)

export default router;
