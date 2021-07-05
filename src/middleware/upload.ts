import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import config from '../config/config';

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region : 'ap-northeast-2'
});

const s3 = new AWS.S3();

let upload = {
    uploadSingle: multer({
        storage: multerS3({
            s3: s3,
            bucket: "test-yaewon",
            contentType: multerS3.AUTO_CONTENT_TYPE, 
            acl: 'public-read',
            key: (req, file, cb) => {
                cb(null, "test/"+file.originalname) 
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).single('image'),

    uploadAry: multer({
        storage: multerS3({
            s3: s3,
            bucket: "test-yaewon",
            contentType: multerS3.AUTO_CONTENT_TYPE, 
            acl: 'public-read',
            key: (req, file, cb) => {
                cb(null, "test/"+file.originalname) 
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).array('image', 2),
}

export= upload;

