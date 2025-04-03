import { Router } from "express";
import { TravelService } from "../services/TravelService.js";
import { TravelRepository } from "../repositories/TravelRepository.js";
import TravelController from "../controllers/TravelController.js";

const travelRouter = Router();
const travelRepository = new TravelRepository();
const travelService = new TravelService(travelRepository);
const travelController = new TravelController(travelService);

travelRouter.post("/create-travel", travelController.postTravel.bind);

export default travelRouter;
