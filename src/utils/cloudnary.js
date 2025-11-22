import {v2 as cloudinary} from 'cloudinary';

import fs from 'fs'; 



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
   
    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
            })
            //file has been uploaded successfully
            console.log("file has been upladed successfully", response.url);
            return response.url;
        } catch (error) {
            fs.unlinkSync(localFilePath); //remove he locally saved file temporary file as the upload has failed
            return null;
        }
    }

    export {uploadOnCloudinary};