import mongoose, { Schema } from "mongoose";

const providerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        service: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        availability: {
            type: Boolean,
            default: true
        },
        experience: {
            type: String,
            required: true,
            trim: true
        },
        approvalStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        idProof: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
)


export const Provider = mongoose.model("Provider", providerSchema)