import { eq } from 'drizzle-orm'
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
    
    if (!providerId.trim() || providerId === ':id') throw ApiError.badRequest("Provider id is required");

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
    
    const [providerService] = await db.insert(providerServiceTable).values({providerId, serviceId}).returning({providerId: providerServiceTable.providerId, serviceId: providerServiceTable.serviceId})

    return providerService
}

const verifyProviderService = async (providerID: string) =>{
    if(!providerID.trim() || providerID === ':id') throw ApiError.badRequest("Provider id is required");

    const [verifiedProvider] = await db.update(providersTable).set({isVerified: true}).where(eq(providersTable.providerId, providerID)).returning({isVerified: providersTable.isVerified})

    return verifiedProvider

}

export { getAllProvidersService, providerProfileService, singleProviderService, updateProviderProfileService, availabilityToggleService, addservicesService, verifyProviderService}
