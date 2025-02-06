import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";

export const s3Uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        // acl: "public-read",
        key: function (req, file, cb)  {
            if(!file){
                return cb(new Error("No file found"));
            }
            console.log(file);
            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
                return cb(new Error("Invalid file type"));
            }

            const fileExtension = file.originalname.split(".")[1];

            //if file is image proceed with upload
            cb(null, Date.now().toString()+"."+fileExtension);
        }
    })
});