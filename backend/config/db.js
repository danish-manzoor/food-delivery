import mongoose from "mongoose";

export const dbConnect = async()=>{
    await mongoose.connect('mongodb+srv://danish4984561:hOXgvUxlkU3mghBU@cluster0.ecgs9.mongodb.net/food-del').then(()=>console.log('DB connect successfully'));
}

