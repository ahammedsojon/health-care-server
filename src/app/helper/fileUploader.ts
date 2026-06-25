import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"
import path from "path"
import { cwd } from "process"
import config from '../../config';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(cwd(), '/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: Express.Multer.File) => {
    // Configuration
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.cloud_api_key,
        api_secret: config.cloud_api_secret // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    return uploadResult
}

export const fileUploader = {
    upload,
    uploadToCloudinary
}

