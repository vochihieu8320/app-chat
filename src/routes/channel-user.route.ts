const express = require('express')
import userService from '../service/user.service';
import channelUserController from '../controller/channel-user.controller';


const router = express.Router();

// get a list of channel that usesr take pariticate

router.get('/', userService.authentication, channelUserController.getListChannels);

//check user has been participated 

router.get('/check-channel/:userID', userService.authentication, channelUserController.checkChannel)

router.get('/:channelID/users', userService.authentication, channelUserController.getUserInfo)

router.delete('/', userService.authentication, channelUserController.deleteChannelUser)

export default router