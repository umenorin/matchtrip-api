import { inject } from "tsyringe";
import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import ITravelSevice from "../Interfaces/ITravelService.js";

export class TravelService implements ITravelSevice {
  private readonly _travelRepository: ITravelRepository;

  constructor(@inject("ITravelRepository") travelRepository: ITravelRepository) {
    this._travelRepository = travelRepository;
  }

  async createTravel(travelDto: TravelDtoRequest): Promise<void> {
    await this._travelRepository.register(travelDto)
  }
  deleteTravel(travelId: string): void {
    throw new Error("Method not implemented.");
  }
  editTravel(travel: TravelDtoRequest): void {
    throw new Error("Method not implemented.");
  }
  getTravel(travel: TravelDtoRequest): void {
    throw new Error("Method not implemented.");
  }
  getTravels(travelMaxQuantity: number): Array<TravelDtoRequest> {
    throw new Error("Method not implemented.");
  }
}
