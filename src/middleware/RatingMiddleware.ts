// src/middleware/RatingMiddleware.ts
import { Request, Response, NextFunction } from "express";
import RatingDto from "../DTO/RatingDto.js";
import RatingOfUserDto from "../DTO/RatingOfUserDto.js";

export const validateRating = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ratingId = req.body.rating
      ? req.body.rating
      : req.body.travel?.rating;

    const { userRating } = req.body;

    if (!ratingId) {
      res.status(400).json({
        message: "Rating ID is required",
      });
      return;
    }

    if (!userRating) {
      res.status(400).json({
        message: "User rating data is required",
      });
      return;
    }

    const errors: string[] = [];

    if (
      typeof userRating.score !== "number" ||
      userRating.score < 1 ||
      userRating.score > 5
    ) {
      errors.push("Score must be between 1 and 5");
    }

    if (typeof userRating.userId !== "string") {
      errors.push("User ID must be a string");
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ error: "Internal server error during validation" });
    return;
  }
};

export const calculateAverageRating = (existingRatings: RatingOfUserDto[]): number => {
  if (existingRatings.length === 0) return 0;
  const total = existingRatings.reduce(
    (sum, rating) => sum + rating.score,
    0
  );
  return Number((total / existingRatings.length).toFixed(1));
};
