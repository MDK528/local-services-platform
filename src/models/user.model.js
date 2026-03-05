import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        phone:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String
        },
        role: {
            type: String,
            enum: ["customer", "provider", "admin"],
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
)


export const User = mongoose.model("User", userSchema)