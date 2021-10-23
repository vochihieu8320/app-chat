"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Conversations = new mongoose_1.default.Schema({
    userID: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    },
    author: String,
    date_time: String,
    content: String,
    files: String,
    is_video: Boolean
}, { timestamps: true });
const model = mongoose_1.default.model("Conversations", Conversations);
exports.default = model;
