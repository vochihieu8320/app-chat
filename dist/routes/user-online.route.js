"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const user_online_controller_1 = __importDefault(require("../controller/user-online.controller"));
const router = express.Router();
router.get('/:channelID', user_online_controller_1.default.getUserOnlineTest);
exports.default = router;
