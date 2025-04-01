import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { userValidator } from "../middleware/UserValidator.js";
import UserService from "../services/UserService.js";
import UserRepository from "../repositories/UserRepository.js";

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post(
  "/singup",
  userValidator,
  userController.postUser.bind(userController)
);
userRouter.post("/login", userController.loginUser.bind(userController));

export default userRouter;
