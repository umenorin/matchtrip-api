import { Router } from "express";
import { TravelService } from "../services/TravelService.js";
import { TravelRepository } from "../repositories/TravelRepository.js";
import TravelController from "../controllers/TravelController.js";
import { container } from "tsyringe";

const travelRouter = Router();
const travelRepository = new TravelRepository();
const travelService = new TravelService(travelRepository);
const travelController = new TravelController(travelService);

travelRouter.post("/create", async (req, res, next) => {
  try {
    const controller = container.resolve(TravelController);
    await controller.postTravel(req, res);
  } catch (error) {
    next(error);
  }
});

export default travelRouter;
