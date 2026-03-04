import express, {json, urlencoded, static as static_} from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(json({limit: "24kb"}))
app.use(urlencoded({limit: "24kb"}))
app.use(cookieParser())
app.use(static_("public"))


export {app}