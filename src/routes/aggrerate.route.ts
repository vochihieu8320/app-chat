const express = require('express')

import aggrerateController from '../controller/aggrerate.controller';

const router = express.Router();

//create a channel
router.get('/', aggrerateController.Aggrerate)
router.get('/count')


export default router