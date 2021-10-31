"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const uploadfile_controller_1 = __importDefault(require("../controller/uploadfile.controller"));
const multer = require('multer');
const uploadfile_controller_2 = __importDefault(require("../controller/uploadfile.controller"));
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('', upload.single('file'), uploadfile_controller_1.default.upload);
router.get('/:key', uploadfile_controller_2.default.getFile);
exports.default = router;
