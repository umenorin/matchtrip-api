// src/interfaces/IRatingRepository.ts
import RatingDto from "../DTO/RatingDto.js";

export interface IRatingRepository {
  findById(id: string): Promise<RatingDto | null>;
  updateRating(
    id: string,
    rating: Partial<RatingDto>
  ): Promise<RatingDto | null>;
}
