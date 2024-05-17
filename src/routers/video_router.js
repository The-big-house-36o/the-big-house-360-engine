import videoController from "../controllers/video_controller.js";
import express from "express";
import VideoUploader from "../middlewares/video_multer.js";
import imageUploader from "../middlewares/multer.js";

const videoRoutes = express.Router();

videoRoutes.get("/", videoController.getAllVideos);
videoRoutes.post("/", VideoUploader.single("url"), videoController.postVideo);
videoRoutes.get("/single-user", videoController.getTotalVideoByUser);


export default videoRoutes