"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chanel_controller_1 = __importDefault(require("../controller/chanel.controller"));
const user_service_1 = __importDefault(require("../service/user.service"));
const router = express_1.default.Router();
//create a channel
router.post('/', user_service_1.default.authentication, chanel_controller_1.default.create);
//user join a channel
router.post('/join-channel', chanel_controller_1.default.join_channel);
router.patch('/:channelID', user_service_1.default.authentication, chanel_controller_1.default.updateChannel);
//get infomartion about this channel
router.get('/:channelID', user_service_1.default.authentication, chanel_controller_1.default.DetailChannel);
// update channel
router.delete('/', user_service_1.default.authentication, chanel_controller_1.default.deleteChannel);
exports.default = router;
