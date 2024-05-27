import commentModel from "../models/comments.js";
import User from "../models/user.js";
import videoModel from "../models/video.js";
import { Request, Response } from "express";


const commentsController = {
    addComment: async (req: Request, res: Response) => {
        const { commentedBy, message, videoId } = req.body;
        try {
            const user = await User.findById(commentedBy);
            if (!user) {
                return res.status(404).json({ message: "User does not exists" })
            }
            const video = await videoModel.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video does not exists" })
            }

            const newComment = new commentModel({
                commentedBy,
                message,
                videoId
            })

            newComment.save();
            return res.status(201).json({
                message: "success",
                data: newComment,
            })
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`
            })
        }

    }
}

export default commentsController;