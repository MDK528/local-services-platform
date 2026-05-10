import { z } from 'zod'
import BaseDto from '../../../common/dto/base.dto.js'

export class CreateCategoryDto extends BaseDto {
    static schema = z.object({
        categoryName: z.string().trim().min(2, 'Category name must be at least 2 characters'),
        categoryDescription: z.string().trim().optional(),
    })
}

export class UpdateCategoryDto extends BaseDto {
    static schema = z.object({
        categoryName: z.string().trim().min(2).optional(),
        categoryDescription: z.string().trim().optional(),
    })
}

export class CreateServiceDto extends BaseDto {
    static schema = z.object({
        categoryId: z.uuid('Invalid category ID'),
        serviceName: z.string().trim().min(2, 'Service name must be at least 2 characters'),
        servicePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
        serviceDescription: z.string().trim().min(10, 'Service description must be at least 10 characters'),
    })
}

export class UpdateServiceDto extends BaseDto {
    static schema = z.object({
        categoryId: z.uuid().optional(),
        serviceName: z.string().trim().min(2).optional(),
        servicePrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
        serviceDescription: z.string().trim().min(10, 'Service description must be at least 10 characters').optional(),
    })
}

export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto.schema>
export type UpdateCategoryDtoType = z.infer<typeof UpdateCategoryDto.schema>
export type CreateServiceDtoType = z.infer<typeof CreateServiceDto.schema>
export type UpdateServiceDtoType = z.infer<typeof UpdateServiceDto.schema>