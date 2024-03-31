import ChannelModel from "../models/channel.js";
import videoModel from "../models/video.js";
import cloudinary from "../utils/cloudinary.js";

const videoController = {
postVideo: async (req, res) => {
        const { title, description, url, channelId } = req.body;
        if (!(title, channelId)) {
            return res.status("400").json({ message: "Channel ID is required" })
        }

        if (title == "" || description == "") {
            return res.status(400).json({ message: "Title and description are required fields " })
        }

        try {
            const channel = await ChannelModel.findById(channelId)
            if (!channel) {
                return res.status(404).json({ message: "Channel does not exist" })
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, { resource_type: 'video', public_id: "Video" });
            const videoUrl = uploadResult.secure_url;

            const newVideo = new videoModel({
                title,
                description,
                url: videoUrl,
                channel: channelId,
                channelInfo: channel
            })
            await newVideo.save();

            channel.videos.push(newVideo._id);
            channel.save();

            return res.status(201).json({ data: newVideo });

        } catch (error) {
            console.error("Error uploading video:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }



    },

    getAllVideos: async (req, res) => {
        try {
            const videos = await videoModel.find();
            if (!videos) {
                return res.status(404).json({ message: "No video found" });
            }

            return res.status(200).json({ videos });
        } catch (error) {

        }
    },

    likeAVideo: async (req, res) => {

    }


}

export default videoController;