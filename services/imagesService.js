const AWS = require('aws-sdk');
const s3 = new AWS.S3({});

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
