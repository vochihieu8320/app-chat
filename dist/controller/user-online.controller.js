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
    Create(userID, name, channelID, SocketID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_useronline = yield user_online_model_1.default.findOne({ userID: userID, channelID: channelID });
                if (!find_useronline) {
                    const body = {
                        userID: userID,
                        name: name,
                        channelID: channelID,
                        socketID: SocketID
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
                const userOnline = yield user_online_model_1.default.aggregate([
                    {
                        $match: { channelID: channelID }
                    },
                    {
                        "$addFields": { "userIdconvert": { "$toObjectId": "$userID" } },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userIdconvert",
                            foreignField: "_id",
                            as: "userinfo"
                        }
                    }
                ]);
                return userOnline;
            }
            catch (error) {
            }
        });
    }
    getUserOnlineTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const userOnline = await user_oline.find({channelID : channelID});
                // return userOnline;
                const channelID = req.params.channelID;
                const userOnline = yield user_online_model_1.default.aggregate([
                    {
                        $match: { channelID: channelID }
                    },
                    {
                        "$addFields": { "userIdconvert": { "$toObjectId": "$userID" } },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userIdconvert",
                            foreignField: "_id",
                            as: "userinfo"
                        }
                    }
                ]);
                res.json(userOnline);
            }
            catch (error) {
                console.log(error);
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
    userOffbrowser(socketID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_online_model_1.default.deleteOne({ socketID: socketID });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new userOnline;
