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
const channel_js_1 = __importDefault(require("../models/channel.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
const video_js_1 = __importDefault(require("../models/video.js"));
const videoController = {
    postVideo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, channelId, userId, url, thumbnail } = req.body;
        if (title == "" || description == "") {
            return res.status(400).json({ message: "Title and description are required fields " });
        }
        try {
            const user = yield user_js_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Invalid User" });
            }
            const channel = yield channel_js_1.default.findById(channelId);
            if (!channel) {
                return res.status(404).json({ message: "Channel does not exist" });
            }
            const newVideo = new video_js_1.default({
                title,
                description,
                url,
                channel: channelId,
                user: userId,
                thumbnail
            });
            yield newVideo.save();
            return res.status(201).json({ message: "success", data: newVideo });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error`,
            });
        }
    }),
    getAllVideos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videos = yield video_js_1.default.find();
            if (!videos) {
                return res.status(404).json({ message: "No video found" });
            }
            return res.status(200).json({ videos, total: videos.length });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }),
    getTotalVideoByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).json({ message: "User Id param is required" });
            }
            const existingUser = yield user_js_1.default.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            const count = yield video_js_1.default.countDocuments({ "user": userId });
            return res.status(200).json({ message: "success", totalVideos: count });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    })
};
exports.default = videoController;
