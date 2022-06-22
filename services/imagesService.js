const AWS = require('aws-sdk');
const s3 = new AWS.S3({});

async function upload(imageName, base64Image, type) {
AWS.config.update({
    maxRetries: 3,
    httpOptions: {timeout: 30000, connectTimeout: 5000},
    region: 'us-west-2',
    accessKeyId: 'AKIAWTEED6YVX6AZPUXP',
    accessKeyId: 'N4tAfwmodZYCGcIPWwS3RzqvjADpzTxk1YKIg2oH'
  });
    const params = {
        Bucket: "glints-assignment",
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
