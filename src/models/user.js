import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],

        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,

        },
        channels: {
            type: Number,
            default: 0,
            min: 0
        },
        profile: {
            type: String,
        },
        username: {
            type: String
        },
        bio: {
            type: String,

        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
