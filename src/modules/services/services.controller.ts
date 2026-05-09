import type{ Request, Response } from 'express'
import { createService, getAllServices, getServiceById, updateService, deleteService } from './services.service.js'
import { ApiResponse } from '../../common/utils/apiResponse.js'
import type { UUIDParamsType } from '../../common/dto/uuidParams.dto.js'

const createServiceController = async (req: Request, res: Response) => {
    const service = await createService(req.body)

    ApiResponse.created(res, "Service created successfully", service)
}
const getAllServicesController = async (req: Request, res: Response) => {
    const services = await getAllServices()

    ApiResponse.ok(res, "Fetched all the services", services)
}
const getServiceByIdController = async (req: Request, res: Response) => {
    const serviceId = String(req.params.id)
    const service = await getServiceById(serviceId)

    ApiResponse.ok(res, "Service fetched successfully", service)
}
const updateServiceController = async (req: Request, res: Response) => {

    const serviceId = String(req.params.id)
    const updatedService = await updateService(serviceId, req.body)

    ApiResponse.ok(res, "Service updated successfully", updatedService)
}
const deleteServiceController = async (req: Request, res: Response) => {
    const serviceId = String(req.params.id)
    const deletedService = await deleteService(serviceId)

    ApiResponse.ok(res, "Service deleted successfully", deletedService)
}

export { createServiceController, getAllServicesController, getServiceByIdController, updateServiceController, deleteServiceController }