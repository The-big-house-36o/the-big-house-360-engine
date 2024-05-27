"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const verifyToken = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const secret = process.env.SECRET_TOKEN;
        const verified = jsonwebtoken_1.default.verify(token, secret);
        req.token = verified;
        next();
    }
    catch (error) {
        return res.status(500).send("Invalid token");
    }
};
exports.default = verifyToken;
