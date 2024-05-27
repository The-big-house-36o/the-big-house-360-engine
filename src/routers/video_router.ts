import videoController from "../controllers/video_controller.js";
import { Router } from "express";
import VideoUploader from "../middlewares/video_multer.js";
import imageUploader from "../middlewares/multer.js";

const videoRoutes = Router();

videoRoutes.get("/", videoController.getAllVideos);
videoRoutes.post("/", VideoUploader.single("url"), videoController.postVideo);
videoRoutes.get("/userId", videoController.getTotalVideoByUser);


export default videoRoutes;