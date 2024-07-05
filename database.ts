import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

const MongoURL = process.env.MONGODB_DATABASE_CONNECTION_STRING as string

export const ConnectToDatabase = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MongoURL)
    console.log("Connected to MongoDB successfully")
}


