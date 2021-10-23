"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class socketService {
    constructor() {
        this.sockets = [];
    }
    AddNewInstance(socket) {
        if (!this.CheckExisted(socket)) {
            this.sockets.push(socket);
        }
    }
    CheckExisted(socket) {
        for (let i = 0; i < this.sockets.length; i++) {
            if (this.sockets[i].username === socket.username && this.sockets[i].channelID === socket.channelID) {
                return true;
            }
        }
        return false;
    }
    RemoveInstance(channelID, userName) {
        for (let i = 0; i < this.sockets.length; i++) {
            if (this.sockets[i].username === userName && this.sockets[i].channelID === channelID) {
                this.sockets.splice(i, 1);
            }
        }
    }
    GetSocketInstance(channelID) {
        let instance = [];
        for (let i = 0; i < this.sockets.length; i++) {
            if (this.sockets[i].channelID === channelID) {
                instance.push(this.sockets[i]);
            }
        }
        return instance;
    }
}
exports.default = new socketService;
