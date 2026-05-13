import type { Request, Response } from 'express'
import { ApiResponse } from '../../common/utils/apiResponse.js'
import {
    getAllCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService,
    getAllServicesService, createServiceService, updateServiceService, deleteServiceService,
    getAllBookingsService, forceCancelBookingService,
    verifyProviderService,
} from './admin.service.js'


const getAllCategoriesController = async (req: Request, res: Response) => {
    const categories = await getAllCategoriesService()
    ApiResponse.ok(res, 'Categories fetched successfully', categories)
}

const createCategoryController = async (req: Request, res: Response) => {
    const category = await createCategoryService(req.body)
    ApiResponse.created(res, 'Category created successfully', category)
}

const updateCategoryController = async (req: Request, res: Response) => {
    const category = await updateCategoryService(String(req.params.id), req.body)
    ApiResponse.ok(res, 'Category updated successfully', category)
}

const deleteCategoryController = async (req: Request, res: Response) => {
    await deleteCategoryService(String(req.params.id))
    ApiResponse.noContent(res)
}


const getAllServicesController = async (req: Request, res: Response) => {
    const services = await getAllServicesService()
    ApiResponse.ok(res, 'Services fetched successfully', services)
}

const createServiceController = async (req: Request, res: Response) => {
    const service = await createServiceService(req.body)
    ApiResponse.created(res, 'Service created successfully', service)
}

const updateServiceController = async (req: Request, res: Response) => {
    const service = await updateServiceService(String(req.params.id), req.body)
    ApiResponse.ok(res, 'Service updated successfully', service)
}

const deleteServiceController = async (req: Request, res: Response) => {
    await deleteServiceService(String(req.params.id))
    ApiResponse.noContent(res)
}


const getAllBookingsController = async (req: Request, res: Response) => {
    const bookings = await getAllBookingsService()
    ApiResponse.ok(res, 'Bookings fetched successfully', bookings)
}

const forceCancelBookingController = async (req: Request, res: Response) => {
    const status = await forceCancelBookingService(String(req.params.id))
    ApiResponse.ok(res, 'Booking cancelled successfully', status)
}

const verifyProviderController = async (req: Request, res: Response) => {
    const provider = await verifyProviderService(String(req.params.id))
    ApiResponse.ok(res, `Provider ${provider?.isVerified ? 'verified' : 'unverified'} successfully`, provider)
}

export {
    getAllCategoriesController, createCategoryController, updateCategoryController, deleteCategoryController,
    getAllServicesController, createServiceController, updateServiceController, deleteServiceController,
    getAllBookingsController, forceCancelBookingController,
    verifyProviderController,
}