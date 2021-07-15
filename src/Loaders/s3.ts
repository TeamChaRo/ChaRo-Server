const AWS = require('aws-sdk');
import config from '../config/config'; 

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region : 'ap-northeast-2'
});

const s3 = new AWS.S3();

export = s3;


