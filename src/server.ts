import 'dotenv/config'
import app from './app.js'
import { db } from './common/config/db.js';
import {sql} from 'drizzle-orm'

const PORT = process.env.PORT || 8000

;(async function start () {
    try {
        await db.execute(sql`select 1`)
        app.listen(PORT, ()=>{
            console.log(`Server is running at port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server', error)
        process.exit(1)
    }
})()