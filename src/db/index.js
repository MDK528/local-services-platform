import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "../constant.js";

const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected || DB HOST AT ${(connectionInstance.connection.host)}`);
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
    }
}

export { connectionDB }
