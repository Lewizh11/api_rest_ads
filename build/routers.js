"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var TokensController_1 = __importDefault(require("./controllers/TokensController"));
var middleware_1 = __importDefault(require("./middleware"));
var express_1 = require("express");
var routes = express_1.Router();
var users = new UsersController_1.default();
var tokens = new TokensController_1.default();
routes.get('/tokens', tokens.getTokens);
routes.post('/token', middleware_1.default, tokens.addToken);
routes.delete('/token', middleware_1.default, tokens.deleteToken);
routes.post("/users", users.create);
routes.post("/user", users.getToken);
routes.delete("/user", users.delete);
exports.default = routes;
