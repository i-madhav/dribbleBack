import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
} , {timestamps:true})

export const Profile = mongoose.model("Profile" , profileSchema);