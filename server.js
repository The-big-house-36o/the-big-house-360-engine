import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./src/database/config.js"
import userRoutes from "./src/routers/user_router.js"
import channelRoutes from "./src/routers/channel_router.js";
import videoRoutes from "./src/routers/video_router.js";
import commentRoutes from "./src/routers/comment_router.js";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/video", commentRoutes)


const PORT = process.env.PORT || 303;

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    throw error;
})
