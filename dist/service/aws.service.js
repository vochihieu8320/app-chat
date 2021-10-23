"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEYID;
const secretAccessKey = process.env.AWS_ACCESS_SECRET;
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});
// uploads a file to s3
function uploadFile(file, filetype) {
    const fileStream = fs.createReadStream(file.path);
    const key = `${file.originalname}-${Date.now()}.${filetype}`;
    const uploadParams = {
        Bucket: bucketName,
        acl: 'public-read',
        Body: fileStream,
        Key: key
    };
    return s3.upload(uploadParams).promise();
}
function getFileStream(fileKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName
        };
        const result = yield s3.getObject(downloadParams).createReadStream();
        return result;
    });
}
function deleteTempFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield unlinkFile(file.path);
    });
}
exports.default = { uploadFile, getFileStream, deleteTempFile };
