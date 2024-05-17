import express from "express";
import channelController from "../controllers/channel_controller.js";
import ImageUploader from "../middlewares/multer.js"

const channelRoutes = express.Router();

channelRoutes.get("/", channelController.getAllChannels);
channelRoutes.post("/", channelController.createChannel);

export default channelRoutes;