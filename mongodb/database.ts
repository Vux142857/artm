import mongoose from "mongoose";
import 'dotenv/config'

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: 'artm',
        })
        isConnected = true
        console.log('MongoDB is connected successfully !')
    } catch (error) {
        console.log(error)
    }
}