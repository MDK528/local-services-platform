import type { Request, Response } from "express"
import { ApiResponse } from "../../common/utils/apiResponse.js"
import { getAllProvidersService, providerProfileService, singleProviderService, updateProviderProfileService, availabilityToggleService, addservicesService, verifyProviderService } from "./providers.service.js"


const getAllProvidersController = async (req:Request, res:Response) => {
    const providers = await getAllProvidersService()

    ApiResponse.ok(
        res, 
        "All providers fetched successfully", 
        providers
    )
}

const getProviderProfileController = async (req:Request, res:Response) => {
    const providerPayload = await providerProfileService(req.user.id)

    ApiResponse.ok(
        res, 
        "Provider data fetched successfully", 
        providerPayload
    )
}


const singleProviderController = async (req:Request, res:Response) => {
    const { id } = req.params

    const provider = await singleProviderService(String(id))

    ApiResponse.ok(
        res, 
        "Provider fetched successfully", 
        provider
    )

}

const updateProviderProfileController = async (req:Request, res:Response) => {
    const providerId = req.user.id
    const {firstName, lastName, phone, gender, address, avatarUrl, yearExperience, providerBio, serviceArea} = req.body

    const result = await updateProviderProfileService({providerId, firstName, lastName, phone, gender, address, avatarUrl, yearExperience, providerBio, serviceArea})

    ApiResponse.ok(res, "Provider Profile Update Successfully", result)
}

const availabilityToggleController = async (req:Request, res:Response) => {

    const result = await availabilityToggleService(req.user.id)

    ApiResponse.ok(res, `Toggled to ${result?.isAvailable ? 'Available' : 'Unavailable'}`, result?.isAvailable)
}

const addservicesController = async (req:Request, res:Response) => {
    
    const providerId = req.user.id
    const { serviceId } = req.body

    const result = await addservicesService(providerId, serviceId)

    ApiResponse.ok(res, "Service added successfully", result)
}
const verifyProviderController = async (req:Request, res:Response) => {
    const providerId = req.params.id 
    const verifiedProvider = await verifyProviderService(String(providerId))

    ApiResponse.ok(res, "Provider Verification successful", verifiedProvider)
}
export { getAllProvidersController, getProviderProfileController, singleProviderController, updateProviderProfileController, availabilityToggleController, addservicesController, verifyProviderController }
