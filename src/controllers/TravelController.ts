import { inject, injectable } from "tsyringe";
import ITravelService from "../Interfaces/ITravelService.js";
import { Request, Response } from "express";

@injectable()
export default class TravelController {
  private readonly _travelService: ITravelService;

  public constructor(
    @inject("TravelService")
    travelService: ITravelService
  ) {
    this._travelService = travelService;
  }

  public async postTravel(req: Request, res: Response) {
    const { travel } = req.body;
    
    res.json({
      message: travel,
    });
  }
}
