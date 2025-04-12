// src/services/RatingService.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingService {
  constructor(
    @inject("IRatingRepository") private repository: IRatingRepository
  ) {}

  async createRating(rating: RatingDto): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }

  async getRating(id: string): Promise<RatingDto | null> {
    throw new Error("Method not implemented");
  }

  async getAllRatings(): Promise<RatingDto[]> {
    throw new Error("Method not implemented");
  }

  async updateRating(id: string, rating: Partial<RatingDto>): Promise<RatingDto | null> {
    throw new Error("Method not implemented");
  }

  async deleteRating(id: string): Promise<void> {
    throw new Error("Method not implemented");
  }
}
