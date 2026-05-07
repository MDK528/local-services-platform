import { decimal, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersTable } from '../auth/auth.model.js'
import { providersTable } from '../providers/providers.model.js'
import { serviceTable } from '../services/services.model.js'

export const statusEnum = pgEnum('booking_status', ["requested", "confirmed", "in_progress", "completed", "cancelled"])

export const bookingTable = pgTable('bookings', {
    bookingId: uuid('booking_id').primaryKey().defaultRandom(),
    providerId: uuid('provider_id').references(()=> providersTable.providerId),
    userId: uuid('user_id').references(()=> usersTable.id),
    serviceId: uuid('service_id').references(()=> serviceTable.serviceId),
    scheduledAt: timestamp('scheduled_at').notNull(),
    bookingPrice: decimal('booking_price', {precision: 10, scale: 2}),
    status: statusEnum('booking_status'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

})