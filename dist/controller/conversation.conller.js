"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../model/conversation.model"));
class ConversationController {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respone = yield conversation_model_1.default.create(body);
                return true;
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    getChannelConversation(channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_model_1.default.find({ channelID });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    requestConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channelID = req.params.channelID;
                const channels = yield conversation_model_1.default.find({ channelID });
                if (channels) {
                    res.json(channels);
                }
                else {
                    res.sendStatus(400);
                }
            }
            catch (error) {
                res.sendStatus(400);
                console.log(error);
            }
        });
    }
}
exports.default = new ConversationController;
