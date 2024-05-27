"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_js_1 = __importDefault(require("../controllers/upload_controller.js"));
const multer_js_1 = __importDefault(require("../middlewares/multer.js"));
const video_multer_js_1 = __importDefault(require("../middlewares/video_multer.js"));
const uploadRoutes = (0, express_1.Router)();
uploadRoutes.post("/image", multer_js_1.default.single("file"), upload_controller_js_1.default.uploadImage);
uploadRoutes.post("/video", video_multer_js_1.default.single("file"), upload_controller_js_1.default.uploadVideo);
exports.default = uploadRoutes;
