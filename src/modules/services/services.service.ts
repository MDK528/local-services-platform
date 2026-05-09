import { and, eq } from "drizzle-orm"
import { db } from "../../common/config/db.js"
import { ApiError } from "../../common/utils/apiError.js"
import { categoriesTable } from "../categories/categories.model.js"
import type { CreateServiceType, UpdateServiceType } from "./dto/service.dto.js"
import { serviceTable } from "./services.model.js"


const createService = async ({categoryId, serviceName, serviceDescription, servicePrice}: CreateServiceType) => {

    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))

    if(!category) throw ApiError.notfound("Category not found");

    const [service] = await db.insert(serviceTable).values({
                                                                categoryId,
                                                                serviceName,
                                                                serviceDescription,
                                                                servicePrice: String(servicePrice)
                                                            })
                                                    .returning({
                                                        categoryId: serviceTable.categoryId,
                                                        serviceId: serviceTable.serviceId,
                                                        serviceName: serviceTable.serviceName, 
                                                        serviceDescription: serviceTable.serviceDescription
                                                    })

    return service

}
const getAllServices = async () => {

    const [services] = await db.select().from(serviceTable).leftJoin(categoriesTable, eq(categoriesTable.categoryId, serviceTable.categoryId))
    
    if(!services) throw ApiError.notfound("Service not found");

    return services
}
const getServiceById = async (serviceId: string) => {

    const [service] = await db.select().from(serviceTable)
                                        .leftJoin(categoriesTable, eq(categoriesTable.categoryId, serviceTable.categoryId))
                                        .where(eq(serviceTable.serviceId, serviceId))
                                        
    if(!service) throw ApiError.notfound("Service not found");

    return service
}
const updateService = async (serviceId: string, {categoryId, serviceName, serviceDescription, servicePrice}: UpdateServiceType) => {

    const [updatedService] = await db.update(serviceTable).set({
                                    categoryId,
                                    serviceName,
                                    serviceDescription,
                                    servicePrice: String(servicePrice)
                                 })
                                 .where(eq(serviceTable.serviceId, serviceId))
                                 .returning({
                                    categoryId: serviceTable.categoryId,
                                    serviceName: serviceTable.serviceName,
                                    serviceDescription: serviceTable.serviceDescription,
                                    servicePrice: serviceTable.servicePrice
                                 })

    if(!updatedService) throw ApiError.notfound("Service not found");

    return updatedService

}
const deleteService = async (serviceId: string) => {
    
    const [deletedService] = await db.delete(serviceTable).where(eq(serviceTable.serviceId, serviceId))
                                                          .returning({
                                                            serviceId: serviceTable.serviceId,
                                                            categoryId: serviceTable.categoryId,
                                                          })

    if(!deletedService) throw ApiError.notfound("Service not found");

    return deletedService

}

export { createService, getAllServices, getServiceById, updateService, deleteService }