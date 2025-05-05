// src/routes/chatRouter.ts
import { Router } from "express";
import  chatController  from "../controllers/ChatController.js";
import { container } from "tsyringe";

const chatRouter = Router();
const chatControllerInstance = container.resolve(chatController);

chatRouter.get("/:id", chatControllerInstance.getchatOfTravel.bind(chatControllerInstance));

export default chatRouter;