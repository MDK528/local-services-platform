import { boolean, decimal, pgTable, smallint, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { usersTable } from '../auth/auth.model.js'

export const providersTable = pgTable('providers', {
    providerId: uuid('provider_id').primaryKey().references(()=> usersTable.id),
    providerBio: varchar('provider_bio'),
    yearExperience: smallint('year_experience'),
    isVerified: boolean('is_verified').default(false),
    isAvailable: boolean('is_available').default(true),
    avgRating: decimal('avg_rating', {precision: 3, scale: 2}),
    serviceArea: varchar('service_area'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    
})