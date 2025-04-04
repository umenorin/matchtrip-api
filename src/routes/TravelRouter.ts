import { Router } from "express";
import TravelController from "../controllers/TravelController.js";
import { container } from "tsyringe";

const travelRouter = Router();

travelRouter.post("/create", async (req, res, next) => {
  try {
    const controller = container.resolve(TravelController);
    await controller.postTravel(req, res);
  } catch (error) {
    next(error);
  }
});

export default travelRouter;
