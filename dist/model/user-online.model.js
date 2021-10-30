"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_online = new mongoose_1.default.Schema({
    userID: String,
    name: String,
    channelID: String,
    socketID: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
const model = mongoose_1.default.model('User_online', user_online);
exports.default = model;
