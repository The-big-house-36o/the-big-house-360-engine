import bcrypt from "bcrypt";
import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";



const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUser = await User.find();
            if (allUser.length === 0) {
                return res.status(404).json({ message: "No user found" })
            }
            return res.status(200).json({ message: "success", data: allUser });
        } catch (error) {

        }
    },
    signUp: async (req, res) => {

        const { name, email, phone, password, username, bio } = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                message: "Email and password are required fields",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password should be more than 8 chars"
            })
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            const profile = uploadResult.secure_url;
            const newUser = new User({
                name,
                email,
                phone,
                password: hashedPassword,
                profile,
                username,
                bio,

            });

            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        if (!(email, password)) {
            return res.status(400).json({
                message: "Email and password are required fields",
            });
        }
        try {
            const foundUser = await User.findOne({ email });
            if (!foundUser || foundUser == null) {
                return res.status(400).json({
                    message: "User not found",
                });
            }

            const passwordMatched = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatched) {
                return res.status(400).json({
                    message: "Incorrect password",
                })
            }
            return res.status(200).json({
                message: "success",
                user: foundUser
            })
        } catch (error) {

        }
    }

}

export default userController;