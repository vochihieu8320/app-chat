"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
class message {
    constructor(author, content, date_time, userID, channelID) {
        this.author = author;
        this.content = content;
        this.date_time = date_time;
        this.userID = userID;
        this.channelID = channelID;
    }
}
exports.message = message;
