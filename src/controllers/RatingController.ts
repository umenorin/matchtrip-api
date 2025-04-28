// src/controllers/RatingController.ts
import { Request, Response } from "express";
import { IRatingService } from "../Interfaces/IRatingService.js";
import RatingDto from "../DTO/RatingDto.js";
import { container } from "tsyringe";
import RatingOfUserDto from "../DTO/RatingOfUserDto.js";
import { CustomError } from "../errors/CustomError.js";

export default class RatingController {
  private _ratingservice: IRatingService;

  constructor() {
    this._ratingservice = container.resolve<IRatingService>("IRatingService");
  }

  async sendRatingOfTravel(req: Request, res: Response) {
    try {
      const rating = req.body.rating ? req.body.rating : req.body.travel.rating;
      const { userRating } = req.body; // conter userID e o Score
      if (!rating) {
        res.status(400).json({
          message: "this Rating is empty",
        });
      }

      if (!userRating) {
        res.status(400).json({
          message: "this user is empty",
        });
      }

      const ratingDto = new RatingDto({
        id: rating.id,
        ratingOfUser: [
          new RatingOfUserDto({
            userId: userRating.userId,
            score: userRating.score,
          }),
        ],
      });

      const ratingUpdated = await this._ratingservice.updateRating(ratingDto);
      res.status(200).json({
        message: "your rating has send",
        token: ratingUpdated,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.error("Rating insert failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }

  async getRatingOfTravel(req: Request, res: Response) {
    try {
      const rating = req.body.rating ? req.body.rating : req.body.travel.rating;
      if (!rating) {
        res.status(400).json({
          message: "this Rating is empty",
        });
      }


      const ratingUpdated = await this._ratingservice.getRating(rating.id);
      res.status(200).json({
        message: "your rating has send",
        token: ratingUpdated,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        console.error("Rating insert failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }
}
