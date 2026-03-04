import { configDotenv } from  "dotenv"
import { app } from "./app.js"
import { connectionDB } from "./db/index.js"

configDotenv({
    path: './.env'
})



connectionDB()
    .then(()=>
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server listening on port ${process.env.PORT || 8000}`)
        })
    )
    .catch(()=>{
        console.error('MongoDB failed to connect')
    })

