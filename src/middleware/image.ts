const AWS = require('aws-sdk');
var multer = require("multer");
var multerS3 = require("multer-s3");
import config from '../config/config';

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region : 'ap-northeast-2'
});

const s3 = new AWS.S3();

// 이미지 저장경로, 파일명 세팅
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "test-yaewon", // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
        acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
        key: (req, file, cb) => {
            cb(null, "test/"+file.originalname) // 폴더명에 이름 넣으면 된다.
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

module.exports = upload;
