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
const user_service_1 = __importDefault(require("../service/user.service"));
const user_model_1 = __importDefault(require("../model/user.model"));
const session_model_1 = __importDefault(require("../model/session.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class NewController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield user_service_1.default.hashpass(req.body.password);
            let user_info = Object.assign({}, req.body);
            user_info.password = password;
            try {
                const response = yield user_model_1.default.create(user_info);
                res.json(req.body);
            }
            catch (error) {
                console.log("error", error);
                if (+error.code === 11000) {
                    res.json({ "error": "Name or Email is already taken" });
                }
            }
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //look for user
            const { email, password } = req.body;
            const user = yield user_model_1.default.findOne({ email }).exec();
            if (!user) {
                res.json({ status: "error", error: "Invalid username or password" });
            }
            else {
                if (yield user_service_1.default.comparepass(password, user.password)) {
                    const token = user_service_1.default.JWT(user);
                    const refreshToken = user_service_1.default.refreshToken(user);
                    const session = {
                        name: user.name,
                        refreshToken: refreshToken
                    };
                    const check_session = yield session_model_1.default.findOne({ name: user.name });
                    if (check_session) {
                        yield session_model_1.default.updateOne({ name: user.name }, session);
                    }
                    else {
                        yield session_model_1.default.create(session);
                    }
                    res.json({ status: "OK", token: token, refreshToken: refreshToken });
                }
                else {
                    res.json({ status: "error", error: "Invalid username or password" });
                }
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh = req.body.refreshToken;
            if (!refresh) {
                res.sendStatus(403);
            }
            else {
                try {
                    const session = yield session_model_1.default.findOne({ refreshToken: refresh }).exec();
                    if (!session) {
                        res.sendStatus(403);
                    }
                    else {
                        //verify token
                        const user = yield jsonwebtoken_1.default.verify(refresh, process.env.JWT_TOKEN_SECRET || "");
                        //generate new token
                        const token = user_service_1.default.JWT(user);
                        const new_token = user_service_1.default.refreshToken(user);
                        //delete current refresh token
                        const update_session = { refreshToken: new_token };
                        yield session_model_1.default.updateOne({ refreshToken: refresh }, update_session);
                        res.json({ status: "OK", refreshToken: new_token, token: token });
                    }
                }
                catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign({}, req.body);
            try {
                const create_user = yield user_model_1.default.create(user);
                const generate_Token = user_service_1.default.JWT(create_user);
                res.json({ status: 200, data: generate_Token });
            }
            catch (error) {
                res.sendStatus(500);
            }
        });
    }
    check_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.body.refreshToken;
            try {
                //check token of user is valid or not
                const sesion = yield session_model_1.default.findOne({ refreshToken: refreshToken });
                try {
                    const user = yield jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_TOKEN_SECRET || "");
                    const token = user_service_1.default.JWT(user);
                    const _refreshToken = user_service_1.default.refreshToken(user);
                    const update_session = { refreshToken: _refreshToken };
                    yield session_model_1.default.updateOne({ refreshToken: refreshToken }, update_session);
                    res.json({ status: 200, token: token, refreshToken: _refreshToken });
                }
                catch (error) {
                    res.json({ status: "Log out" });
                }
            }
            catch (error) {
                console.log("error", error);
                res.json(500);
            }
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userName = req.params.user_name;
            try {
                const respone = yield session_model_1.default.deleteOne({ name: userName });
                res.json({ status: 200 });
            }
            catch (error) {
                res.json(500);
            }
        });
    }
    detailUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.userID;
            const find_user = yield user_model_1.default.findById(userID);
            if (find_user) {
                res.json(find_user);
            }
            else {
                res.json({ status: 400, error: "invalid userID" });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ status: "ping" });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.userID;
            const body = Object.assign({}, req.body);
            try {
                yield user_model_1.default.updateOne({ _id: userID }, body);
                res.json(yield user_model_1.default.findById(userID));
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new NewController;
