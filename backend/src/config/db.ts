import mongoose from "mongoose";

export const conncetDB = async(): Promise<void> => {
    try{
        const uri = process.env.MONGO_URI || "";
        if (!uri) {
            throw new Error("MONGO_URI is not defined in environment");
        }
        await mongoose.connect(uri);
        console.log("Database connected successfully");
    }
    catch(error){
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
