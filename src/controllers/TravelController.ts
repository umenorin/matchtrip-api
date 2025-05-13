import { inject, injectable } from "tsyringe";
import ITravelService from "../Interfaces/ITravelService.js";
import { Request, Response } from "express";
import {TravelDtoRequest, TravelDtoResponse} from "../DTO/TravelDto.js";
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
      description: travel.description, 
      latitude: travel.latitude,
      longitude: travel.longitude,
      city: travel.city,
      country: travel.country,
      startDate: travel.startDate, 
      endDate: travel.endDate, 
      limitTravelers: travel.travelLimit, 
      owner: travel.owner,
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
      name: travel.name,
      description: travel.description, 
      latitude: travel.latitude,
      longitude: travel.longitude,
      city: travel.city,
      country: travel.country,
      startDate: travel.startDate, 
      endDate: travel.endDate, 
      limitTravelers: travel.travelLimit, 
    });

    try {
      await this._travelService.editTravel(travelDto);
      res.status(201).json({
        travel: travelDto,
      });
      return;
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Travel edit failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async deleteTravel(req: Request, res: Response) {
    const { travel } = req.body;

    try {
      await this._travelService.deleteTravel(travel.id);
      res.status(201).json({
        message: "Travel deleted with sucess",
      });
      return;
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Travel delete failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async getTravel(req: Request, res: Response) {
    const { travel } = req.body;
    console.log("params ",req.params)
    try {
      const travelDto = await this._travelService.getTravel(req.params.id);
      res.status(201).json({
        message: "Travel deleted with sucess",
        travel: travelDto,
      });
      return;
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Travel delete failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async getManyTravels(req: Request, res: Response) {
    const maxTravelNumber = Number(req.body.maxTravel);
    console.log(maxTravelNumber)
    try {
      const travels: TravelDtoResponse[] = await this._travelService.getManyTravels(
        maxTravelNumber
      );
      if (travels.length == 0) {
        res.status(500).json({
          message: "No travels founded",
        });
      }
      res.status(201).json({
        message: "List Travels",
        travels: travels,
      });
      return;
    } catch (error) {
      if (error instanceof CustomError) {
        console.error("Travel getManyTravels failed:", error.message);
        res.status(error.statusHttp).json({ error: error.message });
        return;
      }
      res.status(500).json(error);
    }
  }
}
