"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var envalid_1 = require("envalid");
dotenv_1.default.config();
exports.default = envalid_1.cleanEnv(process.env, {
    MONGO_DB: envalid_1.str(),
    PASS: envalid_1.str(),
    PORT: envalid_1.num()
});
