import express from "express";
import commentsController from "../controllers/comments_controller.js";

const commentRouter = express.Router();

commentRouter.post("/comment", commentsController.addComment);

export default commentRouter;

