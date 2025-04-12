// src/interfaces/IRatingService.ts
import RatingDto from "../DTO/RatingDto.js";

export interface IRatingService {
  createRating(rating: RatingDto): Promise<RatingDto>;
  getRating(id: string): Promise<RatingDto | null>;
  getAllRatings(): Promise<RatingDto[]>;
  updateRating(id: string, rating: Partial<RatingDto>): Promise<RatingDto | null>;
  deleteRating(id: string): Promise<void>;
}
