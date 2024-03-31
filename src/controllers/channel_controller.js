// Import necessary modules
import ChannelModel from "../models/channel.js";
import UserModel from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";


const channelController = {


    createChannel: async (req, res) => {
        try {

            const { userId, title, description } = req.body;


            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }


            const user = await UserModel.findById(userId);


            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            const channelThumbnail = uploadResult.secure_url;

            const newChannel = new ChannelModel({
                title,
                description,
                thumbnail: channelThumbnail,
                createdBy: userId
            });
            user.channels.push(newChannel._id);
            user.save();
            await newChannel.save();

            res.status(201).json({ message: "success", channel: newChannel });
        } catch (error) {
            console.error("Error creating channel:", error);
            res.status(500).json({ message: "Internal Server Error" });
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

        }
    }

}

export default channelController;