import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { userValidator } from "../middleware/UserValidator.js";
import { container } from "tsyringe";
import { configureUpload } from "../multerConfig.js";

const userRouter = Router();

const userControllerInstance = container.resolve(UserController);
const uploadUserAvatar = configureUpload("users");

userRouter.post(
  "/singup",
  uploadUserAvatar.single('profileImage'),
  userValidator,
  userControllerInstance.postUser.bind(userControllerInstance)
);

userRouter.post(
  "/login",
  userControllerInstance.loginUser.bind(userControllerInstance)
);

userRouter.get(
  "/:id",
  userControllerInstance.getUser.bind(userControllerInstance)
);

userRouter.patch("/edit/:id", userControllerInstance.updateUser.bind(userControllerInstance));

userRouter.delete("/delete/:id", userControllerInstance.deleteUser.bind(userControllerInstance));

export default userRouter;
