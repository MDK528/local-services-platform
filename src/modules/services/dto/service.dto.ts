import { z } from "zod"
import BaseDto from "../../../common/dto/base.dto.js"

export class CreateService extends BaseDto {
    static schema = z.object({
        categoryId: z.uuid("Invalid Id or missing"),
        serviceName: z.string().trim().min(2, "Service name must be at least 2 characters"),
        servicePrice: z.number().positive("Price must be a positive number"),
        serviceDescription: z.string().trim().min(10, "Description must be at least 10 characters")
    })
}


export type CreateServiceType = z.infer<typeof CreateService.schema>

export class UpdateService extends BaseDto {
    static schema = z.object({
        categoryId: z.uuid().optional(),
        serviceName: z.string().trim().min(2, "Service name must be at least 2 characters").optional(),
        servicePrice: z.number().positive("Price must be a positive number").optional(),
        serviceDescription: z.string().trim().min(10, "Description must be at least 10 characters").optional()
    })
}

export type UpdateServiceType = z.infer<typeof UpdateService.schema>
