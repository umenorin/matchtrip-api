// src/routes/chatRouter.ts
import { Router } from "express";
import matchController from "../controllers/MatchController.js";
import { container } from "tsyringe";

const matchRouter = Router();
const matchControllerInstance = container.resolve(matchController);

matchRouter.post(
  "/:id",
  matchControllerInstance.sendProbavlyMatch.bind(matchControllerInstance)
);

matchRouter.get(
  "/matchsByTraveler/:id",
  matchControllerInstance.getMatchByTraveler.bind(matchControllerInstance)
);

matchRouter.get(
  "/matchsByTravel/:id",
  matchControllerInstance.getMatchByTravel.bind(matchControllerInstance)
);

matchRouter.post(
  "/recuseMatch/:id",
  matchControllerInstance.recuseMatch.bind(matchControllerInstance)
);

matchRouter.post(
  "/acceptMatch/:id",
  matchControllerInstance.acceptMatch.bind(matchControllerInstance)
);

export default matchRouter;
