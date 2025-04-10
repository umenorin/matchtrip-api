import { Router } from "express";
import TravelController from "../controllers/TravelController.js";
import { container } from "tsyringe";

const travelRouter = Router();
const travelRouterInstance = container.resolve(TravelController);

travelRouter.post(
  "/create",
  travelRouterInstance.postTravel.bind(travelRouterInstance)
);

travelRouter.put(
  "/update",
  travelRouterInstance.updateTravel.bind(travelRouterInstance)
);

travelRouter.delete(
  "/delete",
  travelRouterInstance.deleteTravel.bind(travelRouterInstance)
);

travelRouter.get(
  "/get",
  travelRouterInstance.getTravel.bind(travelRouterInstance)
);

export default travelRouter;
