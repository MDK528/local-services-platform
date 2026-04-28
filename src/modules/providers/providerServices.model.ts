import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { providersTable } from './providers.model.js'
import { serviceTable } from '../services/services.model.js'


export const providerService = pgTable('provider_services', {
    providerId: uuid('provider_id').notNull().references(()=> providersTable.providerId),
    serviceId: uuid('service_id').notNull().references(()=> serviceTable.serviceId),

}, (table)=> [
    primaryKey({name: 'pk_provider_services', columns: [table.providerId, table.serviceId] }),
]);