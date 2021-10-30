const express = require('express')
import userOnlineController from '../controller/user-online.controller';



const router = express.Router();

router.get('/:channelID', userOnlineController.getUserOnlineTest);



export default router;