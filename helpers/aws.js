const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

function uploadImageAWS(file, fileName){
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file, //File
        Key: fileName //ID created by uuid
    };
    return s3.upload(uploadParams).promise();
};

function deleteImageAWS(key){
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };
    return s3.deleteObject(deleteParams).promise();
};

module.exports = {
    getImageAWS,
    uploadImageAWS,
    deleteImageAWS
};
