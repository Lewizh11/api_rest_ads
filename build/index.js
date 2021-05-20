"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routers_1 = __importDefault(require("./routers"));
var env_1 = __importDefault(require("./env"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routers_1.default);
app.get("/", function (_, res) { return res.send("Enfeite...KEK"); });
app.listen(env_1.default.PORT || 8080, function () {
    console.log("Servidor rodando...");
});
