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
const chanel_model_1 = __importDefault(require("../model/chanel.model"));
const chanel_user_model_1 = __importDefault(require("../model/chanel-user.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
class ChanelController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const body = Object.assign({}, req.body);
            try {
                const check_channel = yield chanel_model_1.default.findOne({ name });
                if (check_channel) {
                    res.json({ status: 400, error: "Channel is already existed" });
                }
                else {
                    const new_channel = yield chanel_model_1.default.create(body);
                    res.json({ status: 200, data: new_channel });
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(400);
            }
        });
    }
    join_channel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, channelID } = req.body;
            try {
                const find_user = yield user_model_1.default.findOne({ email });
                if (find_user) {
                    const check_channel = yield chanel_user_model_1.default.findOne({ userID: find_user.email, channelID: channelID });
                    if (check_channel) {
                        res.sendStatus(400);
                    }
                    else {
                        const body = {
                            userID: find_user._id,
                            channelID: channelID
                        };
                        const channel = yield chanel_user_model_1.default.create(body);
                        res.json({ status: 200, channelUser: channel });
                    }
                }
                else {
                    res.json({ status: 200, data: "Account doesn't exist" });
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    DetailChannel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channelID = req.params.channelID;
                const check_channel = yield chanel_model_1.default.findById(channelID);
                if (check_channel) {
                    res.json({ status: 200, data: check_channel });
                }
                else {
                    res.sendStatus(400);
                }
            }
            catch (error) {
                res.sendStatus(500);
            }
        });
    }
    //check user is in this channel or not
    checkUserChannel(userID, channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_chanel = yield chanel_user_model_1.default.findOne({ userID: userID, channelID: channelID });
                if (user_chanel) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
            }
        });
    }
    updateChannel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelID = req.params.channelID;
            try {
                const body = Object.assign({}, req.body);
                yield chanel_model_1.default.updateOne({ _id: channelID }, body);
                res.json({ status: 200, data: yield chanel_model_1.default.findById(channelID) });
            }
            catch (error) {
                res.sendStatus(400);
            }
        });
    }
    deleteChannel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, channelID } = req.query;
            try {
                const find_channel = yield chanel_model_1.default.findById(channelID);
                if (find_channel.owner === userID) {
                    yield chanel_model_1.default.findByIdAndDelete(channelID);
                    yield chanel_user_model_1.default.deleteMany({ channelID: channelID });
                    res.json({ status: 200 });
                }
                else {
                    yield chanel_user_model_1.default.deleteOne({ userID: userID, channelID: channelID });
                    res.json({ status: 200 });
                }
            }
            catch (error) {
                res.json({ status: 400 });
            }
        });
    }
}
exports.default = new ChanelController;
