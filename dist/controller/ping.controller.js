"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pingcontroller {
    hello(req, res) {
        res.json({ data: "hello from vochihieu" });
    }
}
exports.default = new Pingcontroller;
