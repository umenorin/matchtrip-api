import { Router } from "express";
import RatingController from "../controllers/RatingController.js";
import { container } from "tsyringe";
import { validateRating } from "../middleware/RatingMiddleware.js";

const ratingRouter = Router();

const RatingControllerInstance = container.resolve(RatingController);

ratingRouter.post(
    "/sendRating",
    validateRating,
    RatingControllerInstance.sendRatingForTravel.bind(RatingControllerInstance)
);

export default ratingRouter;
