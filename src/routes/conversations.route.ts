import express from 'express';
import conversationConller from '../controller/conversation.conller';
import userService from '../service/user.service';
 

const router = express.Router();

router.post('/', userService.authentication, conversationConller.create )
router.put('/:conversationID')
router.get('/:channelID', userService.authentication, conversationConller.requestConversation)



export default router;