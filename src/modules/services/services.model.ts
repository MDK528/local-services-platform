import { decimal, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { categoriesTable } from '../categories/categories.model.js'


export const serviceTable = pgTable('services', {
    serviceId: uuid('service_id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id').references(()=> categoriesTable.categoryId).notNull(),
    serviceName: varchar('service_name').notNull(),
    servicePrice: decimal('service_price', {precision: 10, scale: 2}).notNull(),
    serviceDescription: varchar('service_description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

})