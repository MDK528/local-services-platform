import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        service: {
            type: String,
            reqired: true
        },
        price:{
            type: Number,
            required: true
        },
        bookingStatus: {
            type: String,
            enum: [
            "requested",
            "accepted",
            "in_progress",
            "completed",
            "cancelled"
            ],
            default: "requested"
        },
        serviceDate: {
            type: Date,
        },
        serviceTime: {
            type: Date,
        },
        address:{
            type: String,
            required: true,
        }

    },
    { timestamps: true }
)


export const Booking = mongoose.model("Booking", bookingSchema)