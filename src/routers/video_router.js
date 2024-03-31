import videoController from "../controllers/video_controller.js";
import  express  from "express";
import VideoUploader from "../middlewares/video_multer.js";

const videoRoutes = express.Router();

videoRoutes.get("/",videoController.getAllVideos)
videoRoutes.post("/",VideoUploader.single("url"),videoController.postVideo)


export default videoRoutes