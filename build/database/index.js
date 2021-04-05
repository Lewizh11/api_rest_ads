"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.tokens = void 0;
var mongoose_1 = require("mongoose");
var Tokens_1 = __importDefault(require("./Tokens"));
var Users_1 = __importDefault(require("./Users"));
var env_1 = __importDefault(require("../env"));
mongoose_1.connect(env_1.default.MONGO_DB, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false
});
exports.tokens = mongoose_1.model("tokens", Tokens_1.default);
exports.users = mongoose_1.model("users_api", Users_1.default);
