import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";

config();

const userController = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allUser = await User.find();
            if (allUser.length === 0) {
                return res.status(404).json({ message: "No user found" })
            }

            return res.status(200).json({ message: "success", data: allUser });
        } catch (error) {
            next(error);
        }
    },
    signUp: async (req: Request, res: Response, next: NextFunction) => {

        const { name, email, phone, password, username, bio, profile } = req.body;

        if (!email || !password) {
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
            const newUser = new User({
                name,
                email,
                phone,
                profile,
                username,
                bio,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();

            return res.status(201).json({
                message: "success",
                user: savedUser
            });
        } catch (error) {
            next(error)
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "all fields are required" })
        }

        try {
            const foundUser = await User.findOne({ email });

            if (!foundUser || foundUser == null) {
                return res.status(400).json({
                    status: "error",
                    message: "User not found",
                });
            }

            const passwordMatched = await bcrypt.compare(password, foundUser.password,);
            if (!passwordMatched) {
                return res.status(400).json({
                    status: "error",
                    message: "Incorrect password",
                })
            }
            const secret: Secret = process.env.SECRETKEY as Secret;
            const token = jwt.sign({ _id: foundUser._id, email }, secret, { expiresIn: "2 days" })

            return res.status(200).json({
                message: "success",
                user: foundUser,
                token
            })
        } catch (error) {
            return res.status(500).json({
                message: `Internal Server Error ${error}`,
            });
        }
    }

}

export default userController;