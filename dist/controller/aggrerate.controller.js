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
const chanel_user_model_1 = __importDefault(require("../model/chanel-user.model"));
class AggrerateController {
    Aggrerate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, skip } = req.query;
            if (userID && skip) {
                const check_user = yield chanel_user_model_1.default.findOne({ userID: userID });
                if (check_user) {
                    const result = yield chanel_user_model_1.default.aggregate([
                        {
                            $match: { userID: userID }
                        },
                        { "$addFields": { "userChannelId": { "$toObjectId": "$channelID" } } },
                        {
                            $lookup: {
                                from: "chanels",
                                localField: "userChannelId",
                                foreignField: "_id",
                                as: "channels"
                            }
                        },
                        {
                            $skip: +skip
                        },
                        {
                            $limit: 5
                        },
                        {
                            $sort: { "updatedAt": -1 }
                        }
                    ]);
                    res.json(result);
                }
                else {
                    res.sendStatus(400);
                }
            }
            else {
                res.sendStatus(400);
            }
        });
    }
}
exports.default = new AggrerateController;
