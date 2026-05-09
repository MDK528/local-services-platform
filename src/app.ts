import express from 'express'
import type {Express} from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './modules/auth/auth.route.js'
import providerRoute from './modules/providers/providers.route.js'
import categoryRoute from './modules/categories/categories.route.js'
import serviceRoute from './modules/services/services.route.js'


const app:Express = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/providers", providerRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/services", serviceRoute)

export default app 