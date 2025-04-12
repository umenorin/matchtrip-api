// src/middleware/RatingMiddleware.ts
import { Request, Response, NextFunction } from "express";
import RatingDto from "../DTO/RatingDto.js";

export class RatingMiddleware {
  static validateRating(req: Request, res: Response, next: NextFunction) {
    try {
      // Cria instância do DTO usando o construtor
      const rating = new RatingDto({
        id: req.body.id,
        score: req.body.score,
        TravelerWhosRating: req.body.TravelerWhosRating
      });

      // Validação manual
      const errors: string[] = [];

      // Validação do score
      if (typeof rating.score !== "number" || rating.score < 1 || rating.score > 5) {
        errors.push("Score must be 1 or 5");
      }

      // Validação do TravelerWhosRating
      if (typeof rating.TravelerWhosRating !== "string") {
        errors.push("TravelerWhosRating must be a string");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
    } catch (error) {
      res.status(400).json({ error: "Formato de dados inválido" });
    }
  }

  static calculateAverageRating(existingRatings: RatingDto[]): number {
    if (existingRatings.length === 0) return 0;
    const total = existingRatings.reduce((sum, rating) => sum + rating.score, 0);
    return Number((total / existingRatings.length).toFixed(1));
  }
}
