// src/services/RatingService.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { inject, injectable } from "tsyringe";
import { IRatingService } from "../Interfaces/IRatingService.js";

@injectable()
export class RatingService implements IRatingService{
  constructor(
    @inject("IRatingRepository") private _ratingRepository: IRatingRepository
  ) {}

  async getRating(id: string): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }

  async updateRating(userRating: string, rating: RatingDto): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }
}
