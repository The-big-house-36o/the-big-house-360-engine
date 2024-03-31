import commentModel from "../models/comments.js";
import User from "../models/user.js";
import videoModel from "../models/video.js";


const commentsController = {
    addComment: async (req, res) => {
        const { commentedBy, message, videoId } = req.body;
        if (!(commentedBy, message, videoId)) {
            return res.status(400).json({
                message: "All field are required"
            })
        }

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
            console.error("Error uploading video:", error);
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

    }
}

export default commentsController;