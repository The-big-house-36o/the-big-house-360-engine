import { Router } from "express";
import userController from "../controllers/user_controller.js"
import ImageUploader from "../middlewares/multer.js"


const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);
userRoutes.post("/signup", userController.signUp);
userRoutes.post("/login", userController.login);




export default userRoutes;