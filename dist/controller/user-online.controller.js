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
const user_online_model_1 = __importDefault(require("../model/user-online.model"));
class userOnline {
    Create(userID, name, channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_useronline = yield user_online_model_1.default.findOne({ userID: userID, channelID: channelID });
                if (!find_useronline) {
                    const body = {
                        userID: userID,
                        name: name,
                        channelID: channelID
                    };
                    yield user_online_model_1.default.create(body);
                }
            }
            catch (error) {
            }
        });
    }
    getUserOnline(channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userOnline = yield user_online_model_1.default.find({ channelID: channelID });
                return userOnline;
            }
            catch (error) {
            }
        });
    }
    userOfline(userID, channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_online_model_1.default.deleteOne({ userID: userID, channelID: channelID });
                return yield user_online_model_1.default.find({ channelID: channelID });
            }
            catch (error) {
            }
        });
    }
}
exports.default = new userOnline;
