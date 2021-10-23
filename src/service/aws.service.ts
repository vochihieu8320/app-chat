const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEYID
const secretAccessKey = process.env.AWS_ACCESS_SECRET

const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file: any, filetype: any) {
  const fileStream = fs.createReadStream(file.path)
  const key = `${file.originalname}-${Date.now()}.${filetype}`
  const uploadParams = {
    Bucket: bucketName,
    acl: 'public-read',
    Body: fileStream,
    Key: key
  }

  return s3.upload(uploadParams).promise()
}
async function getFileStream(fileKey: any) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    const result = await s3.getObject(downloadParams).createReadStream();
  
    return result
  }

 async function deleteTempFile(file: any)
  {
    const result = await unlinkFile(file.path);
   
  }


export default {uploadFile, getFileStream, deleteTempFile}