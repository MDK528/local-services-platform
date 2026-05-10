import express from 'express'
import type { Express } from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors";

import authRoute from './modules/auth/auth.route.js'
import providerRoute from './modules/providers/providers.route.js'
import categoryRoute from './modules/categories/categories.route.js'
import serviceRoute from './modules/services/services.route.js'
import bookingRoute from './modules/bookings/booking.route.js'
import reviewsRoute from './modules/reviews/reviews.route.js'
import adminRoute from './modules/admin/admin.route.js'

const app:Express = express()

app.use(cors({
    origin: ["http://localhost:5173", process.env.CORS_ORIGIN!],
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/providers", providerRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/services", serviceRoute)
app.use("/api/v1/bookings", bookingRoute)
app.use("/api/v1/reviews", reviewsRoute)
app.use("/api/v1/admin", adminRoute)

export default app 