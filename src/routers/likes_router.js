import LikesModel from "../models/likes.js";
import userModel from "../models/user.js";



const likesController = {
    addLike: async (req, res) => {
        try {
            const { userId, videoId } = req.body;

            if (!(userId, videoId)) {
                return res.status(400).json({
                    message: "All field are required"
                })
            }

            const user = await userModel.findById(userId);
            
            if (!user) {
                return res.status.json(404).json({ message: "User not found!!!" })
            }
        } catch (error) {

        }

    }
}