import mongoose, { Schema } from "mongoose"
const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String
    },

    thumbnail: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


}, {
    timestamps: true,
})

const ChannelModel = mongoose.model("Channel", channelSchema);
export default ChannelModel;