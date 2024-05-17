// Import necessary modules
import ChannelModel from "../models/channel.js";
import UserModel from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";


const channelController = {


    createChannel: async (req, res) => {
        try {

            const { userId, title, description , thumbnail} = req.body;


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
            await user.channels.push(newChannel._id);
            await user.save();
            await newChannel.save();

            return res.status(201).json({ message: "success", channel: newChannel });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    },

    getAllChannels: async (req, res) => {
        try {
            const channels = await ChannelModel.find();

            if (!channels) {
                return res.status(404).json({ message: "No channel found" });
            }

            return res.status(200).json({ channels });
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }

}

export default channelController;