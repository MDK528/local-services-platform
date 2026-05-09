import { and, eq } from 'drizzle-orm'
import { db } from '../../common/config/db.js'
import { providersTable } from './providers.model.js'
import { usersTable } from '../auth/auth.model.js'
import { ApiError } from '../../common/utils/apiError.js'
import type { ProfileType } from './dto/providerProfile.dto.js'
import { serviceTable } from '../services/services.model.js'
import { providerServiceTable } from './providerServices.model.js'


const getAllProvidersService = async() => {
    const providers = await db.select({
                                    providerId: providersTable.providerId,
                                    firstName: usersTable.firstName, 
                                    lastName: usersTable.lastName,
                                    email: usersTable.email,
                                    phone: usersTable.phone,
                                    gender: usersTable.gender,
                                    role: usersTable.role,
                                    address: usersTable.address,
                                    avatarUrl: usersTable.avatarUrl,
                                    yearExperience: providersTable.yearExperience,
                                    bio: providersTable.providerBio,
                                }
                            ).from(providersTable)
                            .innerJoin(usersTable, eq(providersTable.providerId, usersTable.id));
    
    if(providers.length < 0) throw ApiError.notfound("Providers not found");

    return providers
}

const providerProfileService = async (providerId: string) =>{

    const [provider] = await db.select({
                                    firstName: usersTable.firstName, 
                                    lastName: usersTable.lastName,
                                    email: usersTable.email,
                                    phone: usersTable.phone,
                                    gender: usersTable.gender,
                                    role: usersTable.role,
                                    address: usersTable.address,
                                    avatarUrl: usersTable.avatarUrl,
                                    yearExperience: providersTable.yearExperience,
                                    bio: providersTable.providerBio,
                                }).from(providersTable)
                                  .innerJoin(usersTable, eq(providersTable.providerId, usersTable.id))
                                  .where(eq(providersTable.providerId, providerId))

    if(!provider) throw ApiError.notfound("Provider not found");

    return provider

}

const singleProviderService = async (providerId: string) =>{ 

    const [provider] = await db.select({
                                    firstName: usersTable.firstName, 
                                    lastName: usersTable.lastName,
                                    email: usersTable.email,
                                    phone: usersTable.phone,
                                    gender: usersTable.gender,
                                    role: usersTable.role,
                                    address: usersTable.address,
                                    avatarUrl: usersTable.avatarUrl,
                                    yearExperience: providersTable.yearExperience,
                                    bio: providersTable.providerBio
                                }).from(providersTable)
                                .innerJoin(usersTable, eq(providersTable.providerId, usersTable.id))
                                .where(eq(providersTable.providerId, providerId));
                                
    if(!provider) throw ApiError.notfound("Provider not found");

    return provider
}

const updateProviderProfileService = async ({providerId, firstName, lastName, phone, gender, address, avatarUrl, yearExperience, providerBio, serviceArea}:ProfileType) => {
    const updatedProvider = await db.transaction(async(tx)=>{

        const [user] = await tx.update(usersTable)
                             .set({firstName, lastName, phone, gender, address, avatarUrl})
                             .where(eq(usersTable.id, providerId))
                             .returning({pid: usersTable.id, email: usersTable.email});

        const [provider] = await tx.update(providersTable)
                             .set({yearExperience, providerBio, serviceArea})
                             .where(eq(providersTable.providerId, providerId))
                             .returning({bio: providersTable.providerBio, serviceArea: providersTable.serviceArea})

        return {...user, ...provider}
    })

    return updatedProvider
}

const availabilityToggleService = async (providerId: string) => {

    const [current] = await db.select({isAvailable: providersTable.isAvailable})
                             .from(providersTable).where(eq(providersTable.providerId, providerId))
                             
    const [toggle] = await db.update(providersTable)
                             .set({isAvailable: !current!.isAvailable}).where(eq(providersTable.providerId, providerId))
                             .returning({isAvailable: providersTable.isAvailable})

    return toggle
}

const addservicesService = async (providerId: string, serviceId: string) => {

    if(!serviceId.trim()) throw ApiError.badRequest("Service id is required");
     let providerService

    try {
        [providerService] = await db.insert(providerServiceTable).values({providerId, serviceId})
                                                                        .returning({
                                                                            providerId: providerServiceTable.providerId, 
                                                                            serviceId: providerServiceTable.serviceId
                                                                        })
    } catch (error) {
         throw ApiError.internal("Failed to add service")
    }

    return providerService
}

const getProviderServicesService = async (providerId: string) => {

    const [services] = await db.select({
        serviceId: serviceTable.serviceId,
        serviceName: serviceTable.serviceName,
        servicePrice: serviceTable.servicePrice,
        serviceDescription: serviceTable.serviceDescription,
    }).from(providerServiceTable)
      .innerJoin(serviceTable, eq(providerServiceTable.serviceId, serviceTable.serviceId))
      .where(eq(providerServiceTable.providerId, providerId))

    if(!services) throw ApiError.notfound("Services not found")
    return services
}

const deleteProviderServiceService = async (providerId: string, serviceId: string) => {
    const [deleted] = await db.delete(providerServiceTable)
                              .where(and(
                                eq(providerServiceTable.providerId, providerId),
                                eq(providerServiceTable.serviceId, serviceId)
                              ))
                              .returning({ serviceId: providerServiceTable.serviceId })

    if (!deleted) throw ApiError.notfound("Service not found")

    return deleted
}


const verifyProviderService = async (providerID: string) =>{

    const [verifiedProvider] = await db.update(providersTable).set({isVerified: true}).where(eq(providersTable.providerId, providerID)).returning({isVerified: providersTable.isVerified})

    return verifiedProvider

}

export { getAllProvidersService, providerProfileService, singleProviderService, updateProviderProfileService, availabilityToggleService, addservicesService, getProviderServicesService, deleteProviderServiceService, verifyProviderService}
