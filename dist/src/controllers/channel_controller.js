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
const channelController = {
    createChannel: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, title, description, thumbnail } = req.body;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const user = yield user_js_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const newChannel = new channel_js_1.default({
                title,
                description,
                thumbnail,
                createdBy: userId
            });
            yield newChannel.save();
            return res.status(201).json({ message: "success", channel: newChannel });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }),
    getAllChannels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const channels = yield channel_js_1.default.find();
            if (!channels || channels.length === 0) {
                return res.status(204).json({ message: "No channel found" });
            }
            return res.status(200).json({ channels, total: channels.length });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }),
    getUserOwnedChannels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const userChannels = yield channel_js_1.default.find({ createdBy: userId });
            if (!userChannels || userChannels.length === 0) {
                return res.status(204).json({ message: "User has no channel" });
            }
            return res.status(200).json({ userChannels, total: userChannels.length });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    })
};
exports.default = channelController;
