import { Router } from "express";
import commentsController from "../controllers/comments_controller.js";
import verifyToken from "../middlewares/verify_token.js";

const commentRouter = Router();

commentRouter.post("/comment", verifyToken, commentsController.addComment);

export default commentRouter;

