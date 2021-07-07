import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import config from '../config/config';
import path from "path";

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region : 'ap-northeast-2' 
});

const s3 = new AWS.S3();

let imageUpload = {
    profileImage : (userId) => multer({
            storage: multerS3({
                s3: s3,
                bucket: "charo-server",
                contentType: multerS3.AUTO_CONTENT_TYPE, 
                acl: 'public-read',
                key: (req, file, cb) => {
                    cb(null, `user/${userId}${path.extname(file.originalname)}`) 
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('image'),

    postImages : (userId) => multer({
            storage: multerS3({
                s3: s3,
                bucket: "charo-server",
                contentType: multerS3.AUTO_CONTENT_TYPE, 
                acl: 'public-read',
                key: (req, file, cb) => {
                    cb(null, `post/${userId}/${Date.now().toString()}${path.extname(file.originalname)}`) 
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
        }).array('image', 6)
}

export = imageUpload;