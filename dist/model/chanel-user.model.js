"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Chanel_User = new mongoose_1.default.Schema({
    userID: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    }
}, { timestamps: true });
const model = mongoose_1.default.model("Chanel-User", Chanel_User);
exports.default = model;
