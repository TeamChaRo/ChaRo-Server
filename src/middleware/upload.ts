const AWS = require('aws-sdk');
var multer = require("multer");
var multerS3 = require("multer-s3");
import config from '../config/config'; 
import path from "path";

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region : 'ap-northeast-2'
});

const s3 = new AWS.S3();

let upload = {
    postImages : multer({
        storage: multerS3({
            s3: s3,
            bucket: "charo-server",
            contentType: multerS3.AUTO_CONTENT_TYPE, 
            acl: 'public-read',
            key: (req, file, cb) => {
                cb(null, `post/${Date.now().toString()}${path.extname(file.originalname)}`) 
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).array('image', 6),
    
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
}
        

export = upload;
