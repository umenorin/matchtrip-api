// src/interfaces/IRatingRepository.ts
import RatingDto from "../DTO/RatingDto.js";

export interface IRatingRepository {
  findById(id: string): Promise<RatingDto | null>;
  update(rating: RatingDto): Promise<RatingDto>;
}
