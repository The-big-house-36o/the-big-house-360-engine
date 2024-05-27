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
const likes_js_1 = __importDefault(require("../models/likes.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
const video_js_1 = __importDefault(require("../models/video.js"));
const likesController = {
    addLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, videoId } = req.body;
            if (!userId || !videoId) {
                return res.status(400).json({
                    message: "Both userId and videoId are required"
                });
            }
            const user = yield user_js_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const video = yield video_js_1.default.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            const existingLike = yield likes_js_1.default.findOne({
                videoId: videoId,
                likedBy: userId
            });
            if (existingLike) {
                return res.status(409).json({ message: "User has already liked this video" });
            }
            const newLike = new likes_js_1.default({
                videoId: videoId,
                likedBy: userId
            });
            yield newLike.save();
            yield video_js_1.default.findByIdAndUpdate(videoId, { $inc: { likes: 1 } });
            return res.status(201).json({ message: "Like added successfully", data: newLike });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", stack: error });
        }
    }),
    getAllVideoLikes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const populateField = req.query.populate;
            let query = likes_js_1.default.find();
            if (populateField) {
                query = query.populate(populateField);
            }
            const likes = yield query;
            if (!likes || likes.length === 0) {
                return res.status(404).json({ message: "No likes found" });
            }
            return res.status(200).json({ likes });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }),
    getSingleVideoLikes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoId = req.query.videoId;
            if (!videoId) {
                return res.status(400).json({ message: "Video Id param is required" });
            }
            const videoLikes = likes_js_1.default.findById(videoId);
            if (!videoLikes) {
                return res.status(404).json({ message: "Video has no likes" });
            }
            return res.status(200).json({ message: "success", data: videoLikes });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    })
};
exports.default = likesController;
