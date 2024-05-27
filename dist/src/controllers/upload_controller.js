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
const cloudinary_js_1 = __importDefault(require("../utils/cloudinary.js"));
const uploadController = {
    uploadImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const uploadTask = yield cloudinary_js_1.default.uploader.upload(imagePath !== null && imagePath !== void 0 ? imagePath : "");
            return res.status(201).json({ message: "success", originalname: (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname, imageUrl: uploadTask.secure_url, });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    uploadVideo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const videoPath = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
            const uploadTask = yield cloudinary_js_1.default.uploader.upload(videoPath !== null && videoPath !== void 0 ? videoPath : "", { resource_type: 'video', public_id: "Video" });
            return res.status(201).json({ message: "success", originalname: (_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname, videoUrl: uploadTask.secure_url, });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    })
};
exports.default = uploadController;
