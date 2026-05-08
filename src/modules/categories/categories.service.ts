import { eq } from 'drizzle-orm'
import { ApiError } from '../../common/utils/apiError.js'
import { db } from '../../common/config/db.js'
import { categoriesTable } from './categories.model.js'
import type { CategoryType } from './dto/categories.dto.js'

const createCategoriesService = async ({categoryName, categoryDescription}: CategoryType) => {
    const [category] = await db.insert(categoriesTable).values({categoryName, categoryDescription})
                                    .returning({
                                        categoryId: categoriesTable.categoryId,
                                        categoryName: categoriesTable.categoryName,
                                        categoryDescription: categoriesTable.categoryDescription
                                    })
    return category
}

const getAllCategoriesService = async () => {
    const categories = await db.select().from(categoriesTable)

    if(!categories) throw ApiError.notfound("Categories not found");

    return categories
}

const getCategoriesByIdService = async (categoryId: string) => {
    if(!categoryId.trim() || categoryId.trim() === ':id') throw ApiError.badRequest("Category Id is required");

    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, categoryId))

    if(!category) throw ApiError.notfound("Category not found")

    return category
}

const updateCategoriesService = async (categoryId: string, categoryName: string, categoryDescription: string) => {
    if(!categoryId) throw ApiError.badRequest("Category Id is required");

    const [updatedCategory] = await db.update(categoriesTable)
                                .set({categoryName: categoryName, categoryDescription: categoryDescription})
                                .where(eq(categoriesTable.categoryId, categoryId))
                                .returning({
                                    categoryId: categoriesTable.categoryId,
                                    categoryName: categoriesTable.categoryName,
                                    categoryDescription: categoriesTable.categoryDescription
                                })

    if(!updatedCategory) throw ApiError.notfound("Category not found")

    return updatedCategory
}

const deleteCategoriesService = async (categoryId: string) => {
    if(!categoryId.trim() || categoryId.trim() === ':id') throw ApiError.badRequest("Category Id is required");

    const [deletedCategory] = await db.delete(categoriesTable)
                                        .where(eq(categoriesTable.categoryId, categoryId))
                                        .returning({categoryId: categoriesTable.categoryId})
                                        
    if(!deletedCategory) throw ApiError.notfound("Category not found")

    return deletedCategory

}


export { createCategoriesService, getAllCategoriesService, getCategoriesByIdService, updateCategoriesService, deleteCategoriesService }