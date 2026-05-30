import express from 'express'
import type { Express, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors";

import authRoute from './modules/auth/auth.route.js'
import providerRoute from './modules/providers/providers.route.js'
import categoryRoute from './modules/categories/categories.route.js'
import serviceRoute from './modules/services/services.route.js'
import bookingRoute from './modules/bookings/booking.route.js'
import reviewsRoute from './modules/reviews/reviews.route.js'
import adminRoute from './modules/admin/admin.route.js'
import { ApiError } from './common/utils/apiError.js';
import { db } from './common/config/db.js';
import { sql } from 'drizzle-orm';

const app:Express = express()

app.use(cors({
    origin: ["http://localhost:5173", process.env.CORS_ORIGIN!],
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.get("/uptime", async(_, res: Response) => {
    
    try {
        await db.execute(sql`SELECT 1`)

        res.status(200).json({
            success: true,
            message: "ok"
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error  
        });
    }
})
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/providers", providerRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/services", serviceRoute)
app.use("/api/v1/bookings", bookingRoute)
app.use("/api/v1/reviews", reviewsRoute)
app.use("/api/v1/admin", adminRoute)

app.use((err: any, req: Request, res: Response, next: NextFunction) =>{
     if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
        return
    }

    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
})

export default app 