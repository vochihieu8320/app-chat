"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const ping_controller_1 = __importDefault(require("../controller/ping.controller"));
const router = express.Router();
router.get('/', ping_controller_1.default.hello);
exports.default = router;
