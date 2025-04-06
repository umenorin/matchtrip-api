import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { userValidator } from "../middleware/UserValidator.js";
import { container } from "tsyringe";

const userRouter = Router();

const userControllerInstance = container.resolve(UserController);

userRouter.post("/singup", userValidator, userControllerInstance.postUser.bind(userControllerInstance));

userRouter.post("/login", userControllerInstance.loginUser.bind(userControllerInstance));

export default userRouter;
