import { Router } from "express";
import { container } from "tsyringe";
import MessageController from "../controllers/MessageController.js";

const messageRouter = Router();
const messageRouterInstance = container.resolve(MessageController);

messageRouter.post(
  "/sendMessage",
  messageRouterInstance.postMessage.bind(messageRouterInstance)
);

export default messageRouter