import { Router } from "express";
import likesController from "../controllers/likes_controller.js";
import verifyToken from "../middlewares/verify_token.js";

const likesRouter = Router();


likesRouter.post("/", verifyToken, likesController.addLike);
likesRouter.get("/", verifyToken, likesController.getAllVideoLikes);
likesRouter.get("/single-video", verifyToken, likesController.getSingleVideoLikes);

export default likesRouter;   