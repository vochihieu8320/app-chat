"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../service/user.service"));
const channel_user_controller_1 = __importDefault(require("../controller/channel-user.controller"));
const router = express_1.default.Router();
// get a list of channel that usesr take pariticate
router.get('/', user_service_1.default.authentication, channel_user_controller_1.default.getListChannels);
//check user has been participated 
router.get('/check-channel/:userID', user_service_1.default.authentication, channel_user_controller_1.default.checkChannel);
router.delete('/', user_service_1.default.authentication, channel_user_controller_1.default.deleteChannelUser);
exports.default = router;
