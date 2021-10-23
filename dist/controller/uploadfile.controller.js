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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_service_1 = __importDefault(require("../service/aws.service"));
class UploadfileController {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.file;
                const { userID, channelID, filetype, author } = req.query;
                const file_upload = yield aws_service_1.default.uploadFile(files, filetype);
                ;
                yield aws_service_1.default.deleteTempFile(files);
                return res.json({ status: 200, file: file_upload.Location });
            }
            catch (error) {
                console.log("error", error);
                res.sendStatus(400);
            }
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = req.params.key;
            const readStream = yield aws_service_1.default.getFileStream(key);
            readStream.pipe(res);
        });
    }
}
exports.default = new UploadfileController;
