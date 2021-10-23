import express from 'express';
import ChanelController from '../controller/chanel.controller';
import userService from '../service/user.service';

const router = express.Router();

//create a channel
router.post('/', userService.authentication, ChanelController.create)


//user join a channel
router.post('/join-channel', ChanelController.join_channel)


router.patch('/:channelID', userService.authentication, ChanelController.updateChannel)


//get infomartion about this channel
router.get('/:channelID', userService.authentication, ChanelController.DetailChannel  )
// update channel


router.delete('/', userService.authentication, ChanelController.deleteChannel)

export default router