// src/controllers/RatingController.ts
import { Request, Response } from "express";
import { IRatingService } from "../Interfaces/IRatingService.js";
import RatingDto from "../DTO/RatingDto.js";
import { container } from "tsyringe";
import { RatingOfUser } from "../models/RatingOfUser.js";
import RatingOfUserDto from "../DTO/RatingOfUserDto.js";

export class RatingController {
  private _ratingservice: IRatingService;

  constructor() {
    this._ratingservice = container.resolve<IRatingService>("IRatingService");
  }

  async sendRatingForTravel(req: Request, res: Response) {
    const rating = req.body.rating ? req.body.rating : req.body.travel.rating;
    const {userRating} = req.body // conter userID e o Score

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
      ratingOfUser:[
        new RatingOfUserDto({userId:userRating.userId, score:userRating.score})
      ]
    });
    
    this._ratingservice.updateRating(userRating, ratingDto);
  }
}
