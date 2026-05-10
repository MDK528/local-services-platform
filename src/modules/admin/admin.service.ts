import { eq } from 'drizzle-orm'
import { db } from '../../common/config/db.js'
import { ApiError } from '../../common/utils/apiError.js'
import { categoriesTable } from '../categories/categories.model.js'
import { serviceTable } from '../services/services.model.js'
import { bookingTable } from '../bookings/booking.model.js'
import { providersTable } from '../providers/providers.model.js'
import type { CreateCategoryDtoType, UpdateCategoryDtoType, CreateServiceDtoType, UpdateServiceDtoType } from './dto/admin.dto.js'

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const getAllCategoriesService = async () => {
    const categories = await db.select().from(categoriesTable)
    if (categories.length <= 0) throw ApiError.notfound('No categories found')
    return categories
}

const createCategoryService = async ({ categoryName, categoryDescription }: CreateCategoryDtoType) => {
    const [category] = await db.insert(categoriesTable)
        .values({ categoryName, categoryDescription })
        .returning({
            categoryId: categoriesTable.categoryId,
            categoryName: categoriesTable.categoryName,
            categoryDescription: categoriesTable.categoryDescription,
        })
    return category
}

const updateCategoryService = async (categoryId: string, body: UpdateCategoryDtoType) => {
    const [existing] = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))
    if (!existing) throw ApiError.notfound('Category not found')

    const [updated] = await db.update(categoriesTable)
        .set(body)
        .where(eq(categoriesTable.categoryId, categoryId))
        .returning({
            categoryId: categoriesTable.categoryId,
            categoryName: categoriesTable.categoryName,
            categoryDescription: categoriesTable.categoryDescription,
        })
    return updated
}

const deleteCategoryService = async (categoryId: string) => {
    const [existing] = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))
    if (!existing) throw ApiError.notfound('Category not found')

    await db.delete(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

const getAllServicesService = async () => {
    const services = await db.select().from(serviceTable)
    if (services.length <= 0) throw ApiError.notfound('No services found')
    return services
}

const createServiceService = async ({ categoryId, serviceName, servicePrice, serviceDescription }: CreateServiceDtoType) => {
    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))
    if (!category) throw ApiError.notfound('Category not found')

    const [service] = await db.insert(serviceTable)
        .values({ categoryId, serviceName, servicePrice, serviceDescription })
        .returning({
            serviceId: serviceTable.serviceId,
            categoryId: serviceTable.categoryId,
            serviceName: serviceTable.serviceName,
            servicePrice: serviceTable.servicePrice,
            serviceDescription: serviceTable.serviceDescription,
        })

    return service
}

const updateServiceService = async (serviceId: string, body: UpdateServiceDtoType) => {
    const [existing] = await db.select().from(serviceTable).where(eq(serviceTable.serviceId, serviceId))
    if (!existing) throw ApiError.notfound('Service not found')

    const [updated] = await db.update(serviceTable)
        .set(body)
        .where(eq(serviceTable.serviceId, serviceId))
        .returning({
            serviceId: serviceTable.serviceId,
            categoryId: serviceTable.categoryId,
            serviceName: serviceTable.serviceName,
            servicePrice: serviceTable.servicePrice,
            serviceDescription: serviceTable.serviceDescription,
        })
        
    return updated
}

const deleteServiceService = async (serviceId: string) => {
    const [existing] = await db.select().from(serviceTable).where(eq(serviceTable.serviceId, serviceId))
    if (!existing) throw ApiError.notfound('Service not found')

    await db.delete(serviceTable).where(eq(serviceTable.serviceId, serviceId))
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

const getAllBookingsService = async () => {
    const bookings = await db.select().from(bookingTable)
    if (bookings.length <= 0) throw ApiError.notfound('No bookings found')
    return bookings
}

const forceCancelBookingService = async (bookingId: string) => {
    const [booking] = await db.select({ status: bookingTable.status })
        .from(bookingTable)
        .where(eq(bookingTable.bookingId, bookingId))

    if (!booking) throw ApiError.notfound('Booking not found')

    if (booking.status === 'completed' || booking.status === 'cancelled') {
        throw ApiError.badRequest(`Cannot cancel a booking that is already ${booking.status}`)
    }

    const [updated] = await db.update(bookingTable)
        .set({ status: 'cancelled' })
        .where(eq(bookingTable.bookingId, bookingId))
        .returning({ status: bookingTable.status })

    return updated
}

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------

const verifyProviderService = async (providerId: string) => {
    const [provider] = await db.select({ isVerified: providersTable.isVerified })
        .from(providersTable)
        .where(eq(providersTable.providerId, providerId))

    if (!provider) throw ApiError.notfound('Provider not found')

    const [updated] = await db.update(providersTable)
        .set({ isVerified: !provider.isVerified })
        .where(eq(providersTable.providerId, providerId))
        .returning({ providerId: providersTable.providerId, isVerified: providersTable.isVerified })

    return updated
}

export {
    getAllCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService,
    getAllServicesService, createServiceService, updateServiceService, deleteServiceService,
    getAllBookingsService, forceCancelBookingService,
    verifyProviderService,
}