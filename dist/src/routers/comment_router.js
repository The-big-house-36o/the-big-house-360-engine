"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_js_1 = __importDefault(require("../controllers/comments_controller.js"));
const verify_token_js_1 = __importDefault(require("../middlewares/verify_token.js"));
const commentRouter = (0, express_1.Router)();
commentRouter.post("/comment", verify_token_js_1.default, comments_controller_js_1.default.addComment);
exports.default = commentRouter;
