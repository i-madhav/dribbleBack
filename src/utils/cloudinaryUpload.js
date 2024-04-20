import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (localFilePath) => {
    try{
        if(!localFilePath) return alert("Unable to find the path");
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })
        console.log("Successful" , response.url);
        fs.unlinkSync(localFilePath);
        return response;
    }catch(error){
        console.error("Couldn't upload the file to cloudninary" , error.message);
        fs.unlink(localFilePath);
        return null;
    }
}

export {uploadOnCloudnary}