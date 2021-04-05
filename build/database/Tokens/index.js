"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
});
exports.default = TokenSchema;
