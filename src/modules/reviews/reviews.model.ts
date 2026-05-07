import { decimal, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { bookingTable } from '../bookings/booking.model.js'
import { providersTable } from '../providers/providers.model.js'
import { usersTable } from '../auth/auth.model.js'


export const reviewsTable = pgTable('reviews', {
    reviewId: uuid('review_id').primaryKey().defaultRandom(),
    bookingId: uuid('booking_id').references(()=> bookingTable.bookingId),
    customerId: uuid('customer_id').references(()=> usersTable.id),
    providerId: uuid('provider_id').references(()=> providersTable.providerId),
    rating: decimal('rating', {precision: 3, scale: 2}),
    comments: varchar('comments'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    
})