// src/interfaces/IRatingService.ts
import RatingDto from "../DTO/RatingDto.js";

export interface IRatingService {
  getRating(id: string): Promise<RatingDto>;
  updateRating(rating: RatingDto): Promise<RatingDto>;
}
