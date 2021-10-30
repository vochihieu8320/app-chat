const express = require('express')
import UploadfileController from '../controller/uploadfile.controller';
const multer = require('multer');
import uploadfileController from '../controller/uploadfile.controller';
const upload = multer({ dest: 'uploads/' }) 

const router = express.Router();

router.post('', upload.single('file'), UploadfileController.upload)
router.get('/:key', uploadfileController.getFile)

export default router;