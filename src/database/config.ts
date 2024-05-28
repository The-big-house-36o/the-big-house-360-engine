import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DBURL as string;

const dbConnect = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Database connection successful")
        return mongoose.connection;
    } catch (error) {
        throw error;
    }
}

export default dbConnect;