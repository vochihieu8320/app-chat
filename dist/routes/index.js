"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const uploadfile_route_1 = __importDefault(require("./uploadfile.route"));
const chanels_route_1 = __importDefault(require("./chanels.route"));
const channel_user_route_1 = __importDefault(require("./channel-user.route"));
const aggrerate_route_1 = __importDefault(require("../routes/aggrerate.route"));
const conversations_route_1 = __importDefault(require("../routes/conversations.route"));
function route(app) {
    app.use('/users', user_route_1.default);
    app.use('/upload', uploadfile_route_1.default);
    app.use('/channels', chanels_route_1.default);
    app.use('/channels-user', channel_user_route_1.default);
    app.use('/aggregate', aggrerate_route_1.default);
    app.use('/conversation', conversations_route_1.default);
}
exports.default = route;
