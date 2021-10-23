"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadfile_controller_1 = __importDefault(require("../controller/uploadfile.controller"));
const multer_1 = __importDefault(require("multer"));
const uploadfile_controller_2 = __importDefault(require("../controller/uploadfile.controller"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = express_1.default.Router();
router.post('', upload.single('file'), uploadfile_controller_1.default.upload);
router.get('/:key', uploadfile_controller_2.default.getFile);
exports.default = router;
