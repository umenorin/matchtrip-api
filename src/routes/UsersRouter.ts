import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { userValidator } from "../middleware/UserValidator.js";
import { container } from "tsyringe";

const userRouter = Router();

userRouter.post("/singup", userValidator, async (req, res, next) => {
  try {
    const controller = container.resolve(UserController);
    await controller.postUser(req, res);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const controller = container.resolve(UserController);
    await controller.loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
