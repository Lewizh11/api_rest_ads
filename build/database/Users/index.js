"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UsersSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
exports.default = UsersSchema;
