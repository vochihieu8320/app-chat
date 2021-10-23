"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_conller_1 = __importDefault(require("../controller/conversation.conller"));
const user_service_1 = __importDefault(require("../service/user.service"));
const router = express_1.default.Router();
router.post('/', user_service_1.default.authentication, conversation_conller_1.default.create);
router.put('/:conversationID');
router.get('/:channelID', user_service_1.default.authentication, conversation_conller_1.default.requestConversation);
exports.default = router;
