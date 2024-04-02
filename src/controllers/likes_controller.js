import likesModel from "../models/likes.js";
import userModel from "../models/user.js";
import videoModel from "../models/video.js";

const likesController = {
    addLike: async (req, res) => {
        try {
            const { userId, videoId, populate } = req.body;

            if (!userId && !videoId) {
                return res.status(400).json({
                    message: "Both userId and videoId are required"
                });
            }

            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const video = await videoModel.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }


            const existingLike = await LikesModel.findOne({
                videoId: videoId,
                likedBy: userId
            });

            if (existingLike) {
                return res.status(409).json({ message: "User has already liked this video" });
            }


            const newLike = new LikesModel({
                videoId: videoId,
                likedBy: userId
            });


            await newLike.save();

            res.status(201).json({ message: "Like added successfully", data: newLike });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", stack: error });
        }
    },

    getAllVideoLikes: async (req, res) => {
        try {
            const populateField = req.query.populate;

            let query = likesModel.find();

            if (populateField) {
                query = query.populate(populateField);
            }

            const likes = await query;

            if (!likes || likes.length === 0) {
                return res.status(404).json({ message: "No likes found" });
            }
            return res.status(200).json({ likes });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    getSingleVideoLikes: async (req, res) => {
        try {
            const videoId = req.query.videoId;
            if (!videoId) {
                return res.status(400).json({ message: "Video Id param is required" });
            }
            const videoLikes = likesModel.findById(videoId);

            if (!videoLikes) {
                return res.status(404).json({ message: "Video has no likes" });
            }

            return res.status(200).json({ status: "success", data: videoLikes });
        } catch (error) {

        }
    }


}

export default likesController;
