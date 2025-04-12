// src/controllers/RatingController.ts
import { Request, Response } from "express";
import { IRatingService } from "../Interfaces/IRatingService.js";
import RatingDto from "../DTO/RatingDto.js";
import { container } from "tsyringe";

export class RatingController {
  private service: IRatingService;

  constructor() {
    this.service = container.resolve<IRatingService>("IRatingService");
  }

  async createRating(req: Request, res: Response) {
    try {
      const rating = new RatingDto(req.body);
      const result = await this.service.createRating(rating);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // ... outros métodos do controller
}
