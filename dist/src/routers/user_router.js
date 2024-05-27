"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = __importDefault(require("../controllers/user_controller.js"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controller_js_1.default.getAllUsers);
userRoutes.post("/signup", user_controller_js_1.default.signUp);
userRoutes.post("/login", user_controller_js_1.default.login);
exports.default = userRoutes;
