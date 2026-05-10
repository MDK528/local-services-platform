import type { Request, Response } from 'express'
import { createBookingService, getBookingsService, getBookingByIdService, updateBookingStatusService } from './booking.service.js'
import { ApiResponse } from '../../common/utils/apiResponse.js'


const createBookingController = async (req: Request, res: Response) => {
    const booking = await createBookingService(req.user.id, req.body)

    ApiResponse.created(res, "Booking created successfully", booking)
}

const getBookingsController = async (req: Request, res: Response) => {
    const bookings = await getBookingsService(req.user.id, req.user.role)

    ApiResponse.ok(res, "Bookings fetched successfully", bookings)
}

const getBookingByIdController = async (req: Request, res: Response) => {
    const bookingId = String(req.params.id)
    
    const booking = await getBookingByIdService(bookingId, req.user.id, req.user.role)

    ApiResponse.ok(res, "Booking fetched successfully", booking)
}

const updateBookingStatusController = async (req: Request, res: Response) => {
    const bookingId = String(req.params.id)
    const status = await updateBookingStatusService(req.user.id, bookingId, req.user.role, req.body)

    ApiResponse.ok(res, "Status updated", status)
}

export { createBookingController, getBookingsController, getBookingByIdController, updateBookingStatusController }