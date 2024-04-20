import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    userName:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
} , {timestamps:true})


userSchema.methods.generateAccessToken = function(){
    return Jwt.sign({
         _id:this._id,
         email:this.email,
         userName:this.userName,
         fullname:this.fullname
     },
     process.env.ACCESS_TOKEN_SECRET, //secret
     {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY //time
     }
     )
 }
 
export const User = mongoose.model("User",userSchema);