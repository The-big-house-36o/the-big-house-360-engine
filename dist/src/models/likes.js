"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const likeSchema = new mongoose_2.Schema({
    videoId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    likedBy: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
const likesModel = mongoose_1.default.model("Likes", likeSchema);
exports.default = likesModel;
