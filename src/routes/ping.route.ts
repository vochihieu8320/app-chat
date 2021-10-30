const express = require('express')
import pingController from '../controller/ping.controller';


const router = express.Router();
router.get('/', pingController.hello)


export default router
