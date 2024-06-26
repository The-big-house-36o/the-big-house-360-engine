
import cloudinary from "../utils/cloudinary.js";
import { Request, Response } from "express";

const uploadController = {
    uploadImage: async (req: Request, res: Response) => {
        try {
            const imagePath = req.file?.path;
            const uploadTask = await cloudinary.uploader.upload(imagePath ?? "");
            return res.status(201).json({ message: "success", originalname: req.file?.originalname, imageUrl: uploadTask.secure_url, });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }

    },

    uploadVideo: async (req: Request, res: Response) => {
        try {
            const videoPath = req.file?.path;
            const uploadTask = await cloudinary.uploader.upload(videoPath ?? "", { resource_type: 'video', public_id: "Video" });
            return res.status(201).json({ message: "success", originalname: req.file?.originalname, videoUrl: uploadTask.secure_url, });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}


export default uploadController;