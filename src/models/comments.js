import mongoose, { Schema } from "mongoose";


const commentSchema = new Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    message: {
        type: String,
        required: [true, "Comment body is required"]
    },
    replies: {
        type: Array
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: [true, "Video id is required"]
    }

}, {
    timestamps: true
})

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel; 