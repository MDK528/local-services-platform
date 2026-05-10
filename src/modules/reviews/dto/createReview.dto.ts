import { z } from "zod"
import BaseDto from "../../../common/dto/base.dto.js"

class CreateReview extends BaseDto {
    static schema = z.object({
        bookingId: z.string().uuid("Invalid booking ID"),
        rating: z.number().min(1).max(5),
        comments: z.string().max(1000).optional(),
    })
}

export default CreateReview
export type CreateReviewType = z.infer<typeof CreateReview.schema>