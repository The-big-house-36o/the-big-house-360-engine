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
            unique: [true, "Email already exists"],
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters"],
        },
        channels: [{
            type: Schema.Types.ObjectId,
            ref: "Channel"
        }],
        profile: {
            type: String,
        },
        username: {
            type: String
        },
        bio: {
            type: String,
            maxlength: [100, "Bio can't be more than 100 words"]
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
