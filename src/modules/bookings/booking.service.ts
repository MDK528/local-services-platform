import { and, eq } from "drizzle-orm"
import { db } from "../../common/config/db.js"
import { bookingTable } from "./booking.model.js"
import { ApiError } from "../../common/utils/apiError.js"
import type { BookingDtoType, UpdateBookingDtoType } from "./dto/booking.dto.js"
import type { AuthUser } from "../auth/auth.middleware.js"
import { serviceTable } from "../services/services.model.js"


const createBookingService = async (customerId: string, { providerId, serviceId, scheduledAt }: BookingDtoType) => {

    const [servicePrice] = await db.select({servicePrice: serviceTable.servicePrice}).from(serviceTable).where(eq(serviceTable.serviceId, serviceId))

    if(!servicePrice) throw ApiError.notfound("Service not found")

    const [booking] = await db.insert(bookingTable).values({providerId, customerId, serviceId, scheduledAt, bookingPrice: servicePrice?.servicePrice})
                                                 .returning({
                                                        bookingId: bookingTable.bookingId,
                                                        customerId: bookingTable.customerId,
                                                        providerId: bookingTable.providerId,
                                                        serviceId: bookingTable.serviceId,
                                                        scheduledAt: bookingTable.scheduledAt,
                                                        bookingPrice: bookingTable.bookingPrice,
                                                        status: bookingTable.status,
                                                    })
    return booking
}

const getBookingsService = async (userId: string, role: AuthUser['role']) => {
    if(role === 'customer') {
        const bookings = await db.select().from(bookingTable).where(eq(bookingTable.customerId, userId))
        if(bookings.length <= 0) throw ApiError.notfound("No bookings");
        return bookings
    }

    if (role === 'provider') {
        const bookings = await db.select().from(bookingTable).where(eq(bookingTable.providerId, userId))
        if(bookings.length <= 0) throw ApiError.notfound("No bookings");
        return bookings
    }

    const bookings = await db.select().from(bookingTable)

    if(bookings.length <= 0) throw ApiError.notfound("No bookings");

    return bookings
}

const getBookingByIdService = async (bookingId: string, userId: string, role: AuthUser['role']) => {

    if (role === 'customer') {
        const [booking] = await db.select().from(bookingTable).where(and(
            eq(bookingTable.bookingId, bookingId),
            eq(bookingTable.customerId, userId)
        ))

        if (!booking) throw ApiError.notfound("Booking not found");
        return booking;
    }

    if (role === 'provider') {
        const [booking] = await db.select().from(bookingTable).where(and(
            eq(bookingTable.bookingId, bookingId),
            eq(bookingTable.providerId, userId)
        ))

        if (!booking) throw ApiError.notfound("Booking not found");
        return booking;
    }

    const [booking] = await db.select().from(bookingTable).where(eq(bookingTable.bookingId, bookingId))

    if(!booking) throw ApiError.notfound("Booking not found");

    return booking
}

const updateBookingStatusService = async (customerId: string, bookingId: string, role: AuthUser['role'], {status}: UpdateBookingDtoType) => {
    
    const [booking] = await db.select({status: bookingTable.status})
                              .from(bookingTable)
                              .where(eq(bookingTable.bookingId, bookingId))
                              console.log(booking?.status);
                              
    if(!booking) throw ApiError.notfound("Booking not found")

    if(status === 'cancelled' && booking.status === 'requested'){
        const [newStatus] = await db.update(bookingTable).set({status: 'cancelled'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }

    if((role === 'provider' || role === 'admin') && status === 'confirmed' && booking.status === 'requested'){
        const [newStatus] = await db.update(bookingTable).set({status: 'confirmed'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }


    if(status === 'cancelled' && booking.status === 'confirmed'){
        const [newStatus] = await db.update(bookingTable).set({status: 'cancelled'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }

    if((role === 'provider' || role === 'admin') && status === 'in_progress' && booking.status === 'confirmed'){
        const [newStatus] = await db.update(bookingTable).set({status: 'in_progress'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }

    if(role === 'admin' && status === 'cancelled' && booking.status === 'in_progress'){
        const [newStatus] = await db.update(bookingTable).set({status: 'cancelled'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }

    if((role === 'provider' || role === 'admin') && status === 'completed' && booking.status === 'in_progress'){
        const [newStatus] = await db.update(bookingTable).set({status: 'completed'})
                                    .where(eq(bookingTable.bookingId, bookingId))
                                    .returning({status: bookingTable.status})
        return newStatus
    }

    throw ApiError.forbidden("Invalid or unauthorized status transition")
}

export {  createBookingService, getBookingsService, getBookingByIdService, updateBookingStatusService }
