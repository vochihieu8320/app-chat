import express from 'express';
import route from '.';
import userController from '../controller/user.controller';
import userService from '../service/user.service';

const router = express.Router();
router.get('/:slug', userController.show);
router.get('/', userService.authentication, userController.show);
router.get('/ping', userService.authentication, userController.show)
router.post('/', userController.createUser);
router.post('/register', userController.Register)
router.post('/login', userController.Login)
//User use token to get another token
router.post('/token', userController.refreshToken)
//check login 
router.post('/check-login',userService.authentication, userController.check_login );
router.delete('/:user_name', userService.authentication, userController.Logout)
//user logout


router.get('/ping', userController.show)

export default router;

