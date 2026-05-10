import { eq } from "drizzle-orm"
import { db } from "../../common/config/db.js"
import { ApiError } from "../../common/utils/apiError.js"
import { bookingTable } from "../bookings/booking.model.js"
import { reviewsTable } from "./reviews.model.js"
import type { CreateReviewType } from "./dto/createReview.dto.js"

const createReviewService = async (customerId: string,{ bookingId, rating, comments }: CreateReviewType) => {
    const [booking] = await db.select()
                              .from(bookingTable)
                              .where(eq(bookingTable.bookingId, bookingId))

    if (!booking) throw ApiError.notfound("Booking not found")

    if (booking.status !== "completed") throw ApiError.badRequest("You can only review a completed booking")

    if (booking.customerId !== customerId)  throw ApiError.forbidden("You are not authorized to review this booking")

    const [review] = await db
        .insert(reviewsTable)
        .values({
            bookingId,
            customerId,
            providerId: booking.providerId,
            rating: String(rating),
            comments,
        })
        .returning({ reviewId: reviewsTable.reviewId })

    return review
}

const getProviderReviewsService = async (providerId: string) => {
    const reviews = await db.select().from(reviewsTable).where(eq(reviewsTable.providerId, providerId))
    
    if (!reviews.length) throw ApiError.notfound("No reviews found for this provider")

    return reviews
}

export { createReviewService, getProviderReviewsService }