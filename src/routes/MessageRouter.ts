import { Router } from "express";
import { container } from "tsyringe";
import MessageController from "../controllers/MessageController.js";

const messageRouter = Router();
const messageRouterInstance = container.resolve(MessageController);
messageRouter.get(
  "/getMessage",
  messageRouterInstance.getMessage.bind(messageRouterInstance)
);

messageRouter.post(
  "/sendMessage",
  messageRouterInstance.postMessage.bind(messageRouterInstance)
);

messageRouter.delete(
  "/deleteMessage",
  messageRouterInstance.deleteMessage.bind(messageRouterInstance)
);

messageRouter.patch(
  "/updateMessage",
  messageRouterInstance.updateMessage.bind(messageRouterInstance)
);

export default messageRouter