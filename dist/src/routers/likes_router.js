"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_controller_js_1 = __importDefault(require("../controllers/likes_controller.js"));
const verify_token_js_1 = __importDefault(require("../middlewares/verify_token.js"));
const likesRouter = (0, express_1.Router)();
likesRouter.post("/", verify_token_js_1.default, likes_controller_js_1.default.addLike);
likesRouter.get("/", verify_token_js_1.default, likes_controller_js_1.default.getAllVideoLikes);
likesRouter.get("/single-video", verify_token_js_1.default, likes_controller_js_1.default.getSingleVideoLikes);
exports.default = likesRouter;
