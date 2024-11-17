import mongoose from "mongoose";

export const  connectDB = async()=>{
    await mongoose.connect('mongodb+srv://manelmimi1108:Manal.12345@cluster0.yavsx.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}