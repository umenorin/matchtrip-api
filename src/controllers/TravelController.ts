import { inject, injectable } from "tsyringe";
import ITravelService from "../Interfaces/ITravelService.js";
import { Request, Response } from "express";
import TravelDtoRequest from "../DTO/TravelDtoRequest.js";

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
    const travelDto = new TravelDtoRequest({
      name: travel.name,
      latitude: travel.latitude,
      longitude: travel.longitude,
      city: travel.city,
      country: travel.country,
    });
    console.log("travelDto ",travelDto)
    try {
      await this._travelService.createTravel(travelDto);
      return res.status(201).json({
        travel: travelDto
      });
    } catch (error) {
      console.error("Travel creation failed:", error);
      return res.status(400).json({ error: "Travel creation failed" });
    }
  }
}
