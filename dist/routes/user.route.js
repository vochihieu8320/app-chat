"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const user_service_1 = __importDefault(require("../service/user.service"));
const uploadfile_controller_1 = __importDefault(require("../controller/uploadfile.controller"));
const router = express_1.default.Router();
router.get('/', user_service_1.default.authentication, user_controller_1.default.show);
router.get('/:userID', user_service_1.default.authentication, user_controller_1.default.detailUser);
router.post('/', user_controller_1.default.createUser);
router.post('/register', user_controller_1.default.Register);
//upload avatart
router.post('/upload', user_service_1.default.authentication, uploadfile_controller_1.default.uploadAvtar);
router.post('/login', user_controller_1.default.Login);
//User use token to get another token
router.post('/token', user_controller_1.default.refreshToken);
//check login 
router.post('/check-login', user_service_1.default.authentication, user_controller_1.default.check_login);
//update user;
router.put('/:userID', user_service_1.default.authentication, user_controller_1.default.updateUser);
router.delete('/:user_name', user_service_1.default.authentication, user_controller_1.default.Logout);
//user logout
exports.default = router;
