// src/services/RatingService.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { inject, injectable } from "tsyringe";
import { IRatingService } from "../Interfaces/IRatingService.js";
import { CustomError } from "../errors/CustomError.js";

@injectable()
export class RatingService implements IRatingService {
  constructor(
    @inject("IRatingRepository") private _ratingRepository: IRatingRepository
  ) {}

  async getRating(id: string): Promise<RatingDto> {
    const ratingGetted = await this._ratingRepository.findById(id);
    if (ratingGetted == null) throw new CustomError("this rating is null", 400);
    return ratingGetted;
  }

  async updateRating(rating: RatingDto): Promise<RatingDto> {
    const ratingUpdated = this._ratingRepository.update(rating);
    return ratingUpdated;
  }
}
