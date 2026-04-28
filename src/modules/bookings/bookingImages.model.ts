import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { bookingTable } from './booking.model.js'

export const bookingImagesTable = pgTable('booking_images', {
    bookingImagesId: uuid('booking_images_id').primaryKey().defaultRandom(),
    bookingId: uuid('booking_id').references(()=> bookingTable.bookingId),
    beforeImages: varchar('before_images').array(),
    afterImages: varchar('after_images').array(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    
})