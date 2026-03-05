import mongoose, { Schema } from "mongoose";

const providerReviewSchema = new Schema(
    {
        review: {
            type: String,
        },
        rating: {
            type: Number,
        },
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking"
        }

    },
    { timestamps: true }
)


export const ProviderReview = mongoose.model("ProviderReview", providerReviewSchema)