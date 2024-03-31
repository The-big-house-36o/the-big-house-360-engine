import express from "express";
import userController from "../controllers/user_controller.js"
import ImageUploader from "../middlewares/multer.js"


const userRoutes = express.Router();

userRoutes.get("/", userController.getAllUsers);
userRoutes.post("/signup", ImageUploader.single("profile"), userController.signUp);
userRoutes.post("/login", userController.login);




export default userRoutes;