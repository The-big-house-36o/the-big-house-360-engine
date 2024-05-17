import express from "express";
import uploadController from "../controllers/upload_controller.js";
import ImageUploader from "../middlewares/multer.js";
import VideoUploader from "../middlewares/video_multer.js";



const uploadRoutes = express.Router();

uploadRoutes.post("/image", ImageUploader.single("file"), uploadController.uploadImage);
uploadRoutes.post("/video", VideoUploader.single("file"), uploadController.uploadVideo);

export default uploadRoutes;