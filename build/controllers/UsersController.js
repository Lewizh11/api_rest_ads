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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __importDefault(require("../env"));
var database_1 = require("../database");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, auth, password, username, salt, passHash, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, auth = _a.auth, password = _a.password, username = _a.username;
                        if (!(auth === env_1.default.PASS)) return [3 /*break*/, 4];
                        if (!password || !username)
                            return [2 /*return*/, res.status(400).json({ error: "Campo de email ou senha não foi preenchido" })];
                        salt = bcrypt_1.default.genSaltSync(5);
                        passHash = bcrypt_1.default.hashSync(password, salt);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.users.create({ username: username, password: passHash })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, res.status(201).json({ info: "Usuário criado com sucesso" })];
                    case 3:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(500).json({ error: "Ocorreu um erro ao criar o usuário" })];
                    case 4:
                        res.status(401).json({ error: "Você não tem autorização!" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, username, getUser, correct, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, username = _a.username;
                        if (!password || !username)
                            return [2 /*return*/, res.status(400).json({ error: "Campo de usuário ou senha não foi preenchido" })];
                        return [4 /*yield*/, database_1.users.findOne({ username: username })];
                    case 1:
                        getUser = _b.sent();
                        if (getUser) {
                            correct = bcrypt_1.default.compareSync(password, getUser.password);
                            if (correct) {
                                token = jsonwebtoken_1.default.sign({ username: username }, env_1.default.PASS);
                                return [2 /*return*/, res.status(200).json({ token: "Bearer " + token })];
                            }
                            return [2 /*return*/, res.status(401).json({ error: "Senha inválida" })];
                        }
                        res.status(400).json({ error: "Usuário não registrado" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, auth, username;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, auth = _a.auth, username = _a.username;
                        if (!auth || !username)
                            return [2 /*return*/, res.status(400).json({ error: "Campo de auth ou username não foi preenchido" })];
                        if (!(auth === env_1.default.PASS)) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.users.exists({ username: username })];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, database_1.users.findOneAndDelete({ username: username })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ info: "Usuário deletado" })];
                    case 3: return [2 /*return*/, res.status(404).json({ error: "Usuário não existe" })];
                    case 4: return [2 /*return*/, res.status(401).json({ error: "Você não tem autorização!" })];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
