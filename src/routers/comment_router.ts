import { Router } from "express";
import commentsController from "../controllers/comments_controller.js";

const commentRouter = Router();

commentRouter.post("/comment", commentsController.addComment);

export default commentRouter;

