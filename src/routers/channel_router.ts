import { Router } from "express";
import channelController from "../controllers/channel_controller.js";
import verifyToken from "../middlewares/verify_token.js";


const channelRoutes = Router();

channelRoutes.get("/", verifyToken, channelController.getAllChannels);
channelRoutes.post("/", verifyToken, channelController.createChannel);
channelRoutes.get("/id", verifyToken, channelController.getUserOwnedChannels);

export default channelRoutes;