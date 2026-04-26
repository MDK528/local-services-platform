import { pgTable, uuid, varchar, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const genderEnum = pgEnum('gender', ['male', 'female'])
export const roleEnum = pgEnum('role', ['admin', 'customer', 'seller'])

export const usersTable = pgTable('users', {
    
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }),
    email: varchar('email', { length: 322 }).notNull().unique(),
    isEmailVerified: boolean('is_email_verified').default(false).notNull(),
    phone: varchar('phone', {length: 17}).notNull().unique(),
    gender: genderEnum('gender'),
    role: roleEnum('role').default('customer').notNull(),
    address: varchar('address', {length: 340}),
    avatarUrl: varchar('avatar_url'),
    password: varchar('password', { length: 66 }),
    refreshToken: varchar('refresh_token'),
    resetPasswordToken: varchar('reset_password_token'),
    resetPasswordExpires: timestamp('reset_password_expires'),
    emailVerificationToken: varchar('email_verification_token'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

})