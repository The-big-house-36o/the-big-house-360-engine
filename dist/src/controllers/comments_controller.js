"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_js_1 = __importDefault(require("../models/comments.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
const video_js_1 = __importDefault(require("../models/video.js"));
const commentsController = {
    addComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { commentedBy, message, videoId } = req.body;
        try {
            const user = yield user_js_1.default.findById(commentedBy);
            if (!user) {
                return res.status(404).json({ message: "User does not exists" });
            }
            const video = yield video_js_1.default.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video does not exists" });
            }
            const newComment = new comments_js_1.default({
                commentedBy,
                message,
                videoId
            });
            newComment.save();
            return res.status(201).json({
                message: "success",
                data: newComment,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`
            });
        }
    })
};
exports.default = commentsController;
