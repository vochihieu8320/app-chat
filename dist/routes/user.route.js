"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const user_service_1 = __importDefault(require("../service/user.service"));
const router = express_1.default.Router();
router.get('/:slug', user_controller_1.default.show);
router.get('/', user_service_1.default.authentication, user_controller_1.default.show);
router.get('/ping', user_service_1.default.authentication, user_controller_1.default.show);
router.post('/', user_controller_1.default.createUser);
router.post('/register', user_controller_1.default.Register);
router.post('/login', user_controller_1.default.Login);
//User use token to get another token
router.post('/token', user_controller_1.default.refreshToken);
//check login 
router.post('/check-login', user_service_1.default.authentication, user_controller_1.default.check_login);
router.delete('/:user_name', user_service_1.default.authentication, user_controller_1.default.Logout);
//user logout
router.get('/ping', user_controller_1.default.show);
exports.default = router;
