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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const index_1 = __importDefault(require("./routes/index"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const conversation_conller_1 = __importDefault(require("./controller/conversation.conller"));
const user_online_controller_1 = __importDefault(require("./controller/user-online.controller"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors({
    origin: ["http://localhost:4200", "http://localhost:3001"]
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = process.env.port;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200", "http://localhost:3001"],
    }
});
(0, db_1.default)();
const adminNamespace = io.of("/admin");
adminNamespace.on("connection", (socket) => {
    console.log(socket.id);
});
adminNamespace.use((socket, next) => {
    // ensure the user has sufficient rights
    if (socket.handshake.auth.token) {
        console.log("token", socket.handshake.auth.token);
    }
    next();
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user has connected");
    socket.on("send-messages", (messages) => __awaiter(void 0, void 0, void 0, function* () {
        const body = Object.assign({}, messages);
        try {
            const check = yield conversation_conller_1.default.create(body);
            if (check) {
                socket.broadcast.to(messages.channelID || "").emit("receive-messages", messages);
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("get_user_online", (channelID, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user_online = yield user_online_controller_1.default.getUserOnline(channelID);
            callback({
                status: "ok"
            });
            io.to(channelID).emit("received_user_online", user_online);
        }
        catch (error) {
            console.log("error", error);
        }
    }));
    socket.on("join-room", (userID, username, channelID, callback) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(channelID);
        try {
            const message = yield conversation_conller_1.default.getChannelConversation(channelID);
            yield user_online_controller_1.default.Create(userID, username, channelID);
            callback({
                status: "ok"
            });
            io.to(channelID).emit("received-room-messages", message);
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on('disconnected', (userID, channelID, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user_online = yield user_online_controller_1.default.userOfline(userID, channelID);
            callback({
                status: user_online
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
}));
httpServer.listen(port, () => { console.log(`Server listen at port ${port}}`); });
(0, index_1.default)(app);
