import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()
const uri = process.env.MONGO_URI;

const connecttoDb = async () => {
    if (!uri) {
        throw new Error("MONGO_URI environment variable is not defined");
    }
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure

    }
}

export default connecttoDb;
