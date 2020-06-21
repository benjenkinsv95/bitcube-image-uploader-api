require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')

const s3Upload = function (file) {
    const extension = file.originalname.split('.').pop()

    const fileStream = fs.createReadStream(file.path)
    fileStream.on('error', console.error)

    const params = {
        Bucket: 'bitcube-image',
        Key: `${file.filename}.${extension}`,
        Body: fileStream,
        ContentType: file.mimetype,
        ACL: 'public-read'

    }

    return s3.upload(params).promise()
}


module.exports = s3Upload

