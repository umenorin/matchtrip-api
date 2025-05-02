import { Request, Response, NextFunction } from "express";
import { CategoryDto } from "../DTO/CategoryDto.js";

export class CategoryMiddleware {
  static validateCategory(req: Request, res: Response, next: NextFunction) {
    const category = new CategoryDto(req.body);
    const errors: string[] = [];

    if (typeof category.name !== "string" || category.name.trim().length < 3) {
      errors.push("Name must be a string with at least 3 characters");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }
}
