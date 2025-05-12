// src/routes/chatRouter.ts
import { Router } from "express";
import  matchController  from "../controllers/MatchController.js";
import { container } from "tsyringe";

const matchRouter = Router();
const matchControllerInstance = container.resolve(matchController);

matchRouter.post("/:id", matchControllerInstance.sendProbavlyMatch.bind(matchControllerInstance));

export default matchRouter;