import { Router } from "express";
import TravelController from "../controllers/TravelController.js";
import { container } from "tsyringe";
import { configureUpload } from "../multerConfig.js";

const travelRouter = Router();
const travelRouterInstance = container.resolve(TravelController);

const uploadTravelAvatar = configureUpload("travels");

travelRouter.post(
  "/create",
  uploadTravelAvatar.single('imageTravel'),
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
  "/getTravel/:id",
  travelRouterInstance.getTravel.bind(travelRouterInstance)
);

travelRouter.get(
  "/getTravels",
  travelRouterInstance.getManyTravels.bind(travelRouterInstance)
);

export default travelRouter;
