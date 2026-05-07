import type { Request, Response } from "express";
import { createCategoriesService, getAllCategoriesService, getCategoriesByIdService, updateCategoriesService, deleteCategoriesService } from "./categories.service.js";
import { ApiResponse } from "../../common/utils/apiResponse.js";

const createCategoriesController = async (req:Request, res:Response) => {
    const category = await createCategoriesService(req.body)

    ApiResponse.created(res, "Category created successfully", category)
}

const getAllCategoriesController = async (req:Request, res:Response) => {
    const categories = await getAllCategoriesService()

    ApiResponse.ok(res, "Categories fetched successfully", categories)
}

const getCategoriesByIdController = async (req:Request, res:Response) => {
    const categoryId = String(req.params.id)
    const category = await getCategoriesByIdService(categoryId)

    ApiResponse.ok(res, "Categories fetched successfully", category)
}

const updateCategoriesController = async (req:Request, res:Response) => {
    const categoryId = String(req.params.id)
    const {categoryName, categoryDescription} = req.body
    const updatedCategory = await updateCategoriesService(categoryId, categoryName, categoryDescription)

    ApiResponse.ok(res, "Category updated successfully", updatedCategory)
}

const deleteCategoriesController = async (req:Request, res:Response) => {
    const categoryId = String(req.params.id)
    const deletedCategory = await deleteCategoriesService(categoryId)

    ApiResponse.ok(res, "Category deleted successfully", deletedCategory)
}

export { createCategoriesController, getAllCategoriesController, getCategoriesByIdController, updateCategoriesController, deleteCategoriesController }
