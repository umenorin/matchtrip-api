// src/interfaces/IRatingRepository.ts
import RatingDto from "../DTO/RatingDto.js";

export interface IRatingRepository {
  create(rating: RatingDto): Promise<RatingDto>;
  findById(id: string): Promise<RatingDto | null>;
  findAll(): Promise<RatingDto[]>;
  update(id: string, rating: Partial<RatingDto>): Promise<RatingDto | null>;
  delete(id: string): Promise<void>;
}
