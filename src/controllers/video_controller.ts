import ChannelModel from "../models/channel.js";
import userModel from "../models/user.js";
import videoModel from "../models/video.js";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary.js";

const videoController = {
    postVideo: async (req: Request, res: Response) => {
        const { title, description, channelId, userId, url, thumbnail } = req.body;



        if (title == "" || description == "") {
            return res.status(400).json({ message: "Title and description are required fields " })
        }

        try {

            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "Invalid User" });
            }
            const channel = await ChannelModel.findById(channelId)

            if (!channel) {
                return res.status(404).json({ message: "Channel does not exist" })
            }

            const newVideo = new videoModel({
                title,
                description,
                url,
                channel: channelId,
                user: userId,
                thumbnail
            })
            await newVideo.save();

            return res.status(201).json({ message: "success", data: newVideo });

        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error`,
            });
        }
    },

    getAllVideos: async (req: Request, res: Response) => {
        try {
            const videos = await videoModel.find();
            if (!videos) {
                return res.status(404).json({ message: "No video found" });
            }

            return res.status(200).json({ videos, total: videos.length });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    },

    getTotalVideoByUser: async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).json({ message: "User Id param is required" });
            }


            const existingUser = await userModel.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const count = await videoModel.countDocuments({ "user": userId });

            return res.status(200).json({ message: "success", totalVideos: count });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }
}

export default videoController;