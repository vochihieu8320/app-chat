"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aggrerate_controller_1 = __importDefault(require("../controller/aggrerate.controller"));
const router = express_1.default.Router();
//create a channel
router.get('/', aggrerate_controller_1.default.Aggrerate);
router.get('/count');
exports.default = router;
