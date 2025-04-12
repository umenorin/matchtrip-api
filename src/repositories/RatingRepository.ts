// src/repositories/RatingRepository.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { injectable } from "tsyringe";

@injectable()
export class RatingRepository implements IRatingRepository {
  create(rating: RatingDto): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }

  findById(id: string): Promise<RatingDto | null> {
    throw new Error("Method not implemented");
  }

  findAll(): Promise<RatingDto[]> {
    throw new Error("Method not implemented");
  }

  update(id: string, rating: Partial<RatingDto>): Promise<RatingDto | null> {
    throw new Error("Method not implemented");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented");
  }
}
