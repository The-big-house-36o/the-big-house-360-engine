import videoController from "../controllers/video_controller.js";
import { Router } from "express";
import VideoUploader from "../middlewares/video_multer.js";
import imageUploader from "../middlewares/multer.js";
import verifyToken from "../middlewares/verify_token.js";

const videoRoutes = Router();

videoRoutes.get("/", videoController.getAllVideos);
videoRoutes.post("/", verifyToken, VideoUploader.single("url"), videoController.postVideo);
videoRoutes.get("/userId", verifyToken, videoController.getTotalVideoByUser);


export default videoRoutes;