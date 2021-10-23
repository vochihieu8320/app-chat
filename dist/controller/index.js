"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.get("/ping", (req, res) => {
        res.sendStatus(200);
    });
}
exports.default = default_1;
