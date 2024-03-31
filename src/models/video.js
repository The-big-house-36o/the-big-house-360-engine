import mongoose from "mongoose";

const { Schema } = mongoose;

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String
        },
        url: {
            type: String,
            required: [true, "Video URL is required"]
        },
        thumbnail: {
            type: String
        },
        likes: {
            type: Number,
            default: 0,
            min: 0
        },
        comments: {
            type: Number,
            default: 0,
            min: 0
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "Channel",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
