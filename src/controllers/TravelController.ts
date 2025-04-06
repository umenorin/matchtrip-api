import { inject, injectable } from "tsyringe";
import ITravelService from "../Interfaces/ITravelService.js";
import { Request, Response } from "express";
import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import { CustomError } from "../errors/CustomError.js";


@injectable()
export default class TravelController {
  private readonly _travelService: ITravelService;

  public constructor(
    @inject("ITravelService")
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

    try {
      await this._travelService.createTravel(travelDto);
      res.status(201).json({
        travel: travelDto,
      });
      return;
    } catch (error) {
      console.error("Travel creation failed:", error);
      res.status(400).json({ error: "Travel creation failed" });
      return;
    }
  }

  public async updateTravel(req: Request, res: Response) {
    const { travel } = req.body;
    const travelDto = new TravelDtoRequest({
      id: travel.id,
      name: travel.name,
      latitude: travel.latitude,
      longitude: travel.longitude,
      city: travel.city,
      country: travel.country,
    });
    
    try {
      await this._travelService.editTravel(travelDto);
      res.status(201).json({
        travel: travelDto,
      });
      return;
    } catch (error) {
      if(error instanceof CustomError){
        console.error("Travel edit failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }
}
