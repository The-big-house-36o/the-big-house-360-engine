"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_controller_js_1 = __importDefault(require("../controllers/channel_controller.js"));
const verify_token_js_1 = __importDefault(require("../middlewares/verify_token.js"));
const channelRoutes = (0, express_1.Router)();
channelRoutes.get("/", verify_token_js_1.default, channel_controller_js_1.default.getAllChannels);
channelRoutes.post("/", verify_token_js_1.default, channel_controller_js_1.default.createChannel);
channelRoutes.get("/id", verify_token_js_1.default, channel_controller_js_1.default.getUserOwnedChannels);
exports.default = channelRoutes;
