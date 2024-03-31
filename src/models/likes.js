import mongoose from "mongoose";
import { Schema } from "mongoose";


const likeSchema = new Schema(
    {
        videoId: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true``
        },

        likedBy: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    }, {
    timestamps: true
}
)

export default LikesModel;