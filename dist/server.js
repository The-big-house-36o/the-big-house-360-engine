"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const config_js_1 = __importDefault(require("./src/database/config.js"));
const user_router_js_1 = __importDefault(require("./src/routers/user_router.js"));
const channel_router_js_1 = __importDefault(require("./src/routers/channel_router.js"));
const video_router_js_1 = __importDefault(require("./src/routers/video_router.js"));
const comment_router_js_1 = __importDefault(require("./src/routers/comment_router.js"));
const likes_router_js_1 = __importDefault(require("./src/routers/likes_router.js"));
const upload_router_js_1 = __importDefault(require("./src/routers/upload_router.js"));
const custom_error_js_1 = __importDefault(require("./src/middlewares/custom_error.js"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// app.use(express.text());
// app.use(express.raw());
app.use("/api/user", user_router_js_1.default);
app.use("/api/channel", channel_router_js_1.default);
app.use("/api/video", video_router_js_1.default);
app.use("/api/video", comment_router_js_1.default);
app.use("/api/likes", likes_router_js_1.default);
app.use("/api/upload", upload_router_js_1.default);
//Not found handler
app.use("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Resource not found",
    });
});
app.use(custom_error_js_1.default);
const PORT = process.env.PORT || 5000;
(0, config_js_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    throw error;
});
