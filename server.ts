import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./src/database/config.js"
import userRoutes from "./src/routers/user_router.js"
import channelRoutes from "./src/routers/channel_router.js";
import videoRoutes from "./src/routers/video_router.js";
import commentRoutes from "./src/routers/comment_router.js";
import likesRoutes from "./src/routers/likes_router.js";
import uploadRoutes from "./src/routers/upload_router.js";
import customError from "./src/middlewares/custom_error.js";



config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.text());
// app.use(express.raw());
app.use("/api/user", userRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/video", commentRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/upload", uploadRoutes);

//Not found handler
app.use("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Resource not found",
    });
});


app.use(customError);
const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    throw error;
})
