"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    channels: {
        type: Number,
        default: 0,
        min: 0
    },
    profile: {
        type: String,
    },
    username: {
        type: String
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
