import { Router } from "express"
import { authenticate, authorize } from "../auth/auth.middleware.js"
import {validate, validateParams} from "../../common/middleware/validate.middleware.js"
import CreateReview from "./dto/createReview.dto.js"
import { createReviewController, getProviderReviewsController } from "./reviews.controller.js"
import UUIDParams from "../../common/dto/uuidParams.dto.js"

const router: Router = Router()

router.post("/", authenticate, authorize("customer"), validate(CreateReview), createReviewController)
router.get("/provider/:id", validateParams(UUIDParams), getProviderReviewsController)   // public

export default router