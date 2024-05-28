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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_js_1 = __importDefault(require("../models/user.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const userController = {
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUser = yield user_js_1.default.find();
            if (allUser.length === 0) {
                return res.status(404).json({ message: "No user found" });
            }
            return res.status(200).json({ message: "success", data: allUser });
        }
        catch (error) {
            next(error);
        }
    }),
    signUp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, phone, password, username, bio, profile } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required fields",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password should be more than 8 chars"
            });
        }
        try {
            const existingUser = yield user_js_1.default.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists",
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_js_1.default({
                name,
                email,
                phone,
                profile,
                username,
                bio,
                password: hashedPassword,
            });
            const savedUser = yield newUser.save();
            return res.status(201).json({
                message: "success",
                user: savedUser
            });
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const foundUser = yield user_js_1.default.findOne({ email });
            if (!foundUser || foundUser == null) {
                return res.status(400).json({
                    message: "User not found",
                });
            }
            const passwordMatched = yield bcrypt_1.default.compare(password, foundUser.password);
            if (!passwordMatched) {
                return res.status(400).json({
                    message: "Incorrect password",
                });
            }
            const secret = process.env.SECRETKEY;
            const token = jsonwebtoken_1.default.sign({ _id: foundUser._id, email }, secret, { expiresIn: "2 days" });
            return res.status(200).json({
                message: "success",
                user: foundUser,
                token
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    })
};
exports.default = userController;
