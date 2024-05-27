
import ChannelModel from "../models/channel.js";
import UserModel from "../models/user.js";
import { Request, Response } from "express";




const channelController = {


    createChannel: async (req: Request, res: Response) => {
        try {

            const { userId, title, description, thumbnail } = req.body;


            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }


            const user = await UserModel.findById(userId);


            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }


            const newChannel = new ChannelModel({
                title,
                description,
                thumbnail,
                createdBy: userId
            });


            await newChannel.save();

            return res.status(201).json({ message: "success", channel: newChannel });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    },

    getAllChannels: async (req: Request, res: Response) => {
        try {
            const channels = await ChannelModel.find();

            if (!channels || channels.length === 0) {
                return res.status(204).json({ message: "No channel found" });
            }

            return res.status(200).json({ channels, total: channels.length });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    },

    getUserOwnedChannels: async (req: Request, res: Response) => {
        const userId = req.params.id;

        try {
            const userChannels = await ChannelModel.find({ createdBy: userId });
            if (!userChannels || userChannels.length === 0) {
                return res.status(204).json({ message: "User has no channel" });
            }

            return res.status(200).json({ userChannels, total: userChannels.length });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }

}



export default channelController;