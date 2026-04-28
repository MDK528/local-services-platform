import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const categoriesTable = pgTable('categories', {
    categoryId: uuid('category_id').primaryKey().defaultRandom(),
    categoryName: varchar('category_name').notNull(),
    categoryDescription: varchar('category_description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(()=> new Date()),
    
})