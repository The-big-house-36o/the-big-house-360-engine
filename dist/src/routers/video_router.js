"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_controller_js_1 = __importDefault(require("../controllers/video_controller.js"));
const express_1 = require("express");
const video_multer_js_1 = __importDefault(require("../middlewares/video_multer.js"));
const verify_token_js_1 = __importDefault(require("../middlewares/verify_token.js"));
const videoRoutes = (0, express_1.Router)();
videoRoutes.get("/", video_controller_js_1.default.getAllVideos);
videoRoutes.post("/", verify_token_js_1.default, video_multer_js_1.default.single("url"), video_controller_js_1.default.postVideo);
videoRoutes.get("/userId", verify_token_js_1.default, video_controller_js_1.default.getTotalVideoByUser);
exports.default = videoRoutes;
