import type { Request, Response } from "express"
import { ApiResponse } from "../../common/utils/apiResponse.js"
import { createReviewService, getProviderReviewsService } from "./reviews.service.js"

const createReviewController = async (req: Request, res: Response) => {
    const review = await createReviewService(req.user.id, req.body)
    ApiResponse.created(res, "Review submitted successfully", review)
}

const getProviderReviewsController = async (req: Request, res: Response) => {
    const providerId = String(req.params.id)
    const reviews = await getProviderReviewsService(providerId)
    
    ApiResponse.ok(res, "Reviews fetched successfully", reviews)
}

export { createReviewController, getProviderReviewsController }