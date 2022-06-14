const AWS = require('aws-sdk');
// const BUCKET_NAME = process.env.IMAGES_BUCKET;
const s3 = new AWS.S3({});

/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */
async function upload(imageName, base64Image, type) {
console.log('process.env.AWS_ACCESS_KEY_ID ', process.env.AWS_ACCESS_KEY_ID)
AWS.config.update({
    maxRetries: 3,
    httpOptions: {timeout: 30000, connectTimeout: 5000},
    region: 'us-west-2',
    accessKeyId: 'AKIA5UT7THKBHIZ377FE',
    accessKeyId: 'Xm0fHgwybM0hsvVAmXENrCoe8hOcSAX9Jz5yG/E2'
  });
    const params = {
        Bucket: "glints-assets",
        Key: imageName,
        Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        ContentType: type
    };

    let data;

    try {
        data = await promiseUpload(params);
    } catch (err) {
        console.error(err);

        return "";
    }

    return data.Location;
}
/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */
function promiseUpload(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {upload};
