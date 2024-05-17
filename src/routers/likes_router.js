import express from "express";
import likesController from "../controllers/likes_controller.js";

const likesRouter = express.Router();


likesRouter.post("/", likesController.addLike);
likesRouter.get("/", likesController.getAllVideoLikes);
likesRouter.get("/single-video",likesController.getSingleVideoLikes);

export default likesRouter;   