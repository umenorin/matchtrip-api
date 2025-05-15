import { inject, injectable } from "tsyringe";
import {
  TravelDtoRequest,
  TravelDtoResponse,
} from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import ITravelSevice from "../Interfaces/ITravelService.js";

@injectable()
export class TravelService implements ITravelSevice {
  private readonly _travelRepository: ITravelRepository;

  constructor(
    @inject("ITravelRepository") travelRepository: ITravelRepository
  ) {
    this._travelRepository = travelRepository;
  }

  async createTravel(travelDto: TravelDtoRequest): Promise<void> {
    await this._travelRepository.register(travelDto);
  }

  async deleteTravel(travelId: string): Promise<void> {
    await this._travelRepository.deleteTravel(travelId);
  }

  async editTravel(travel: TravelDtoRequest): Promise<void> {
    await this._travelRepository.editTravel(travel);
  }

  async getTravel(travelId: string): Promise<TravelDtoResponse> {
    return await this._travelRepository.getTravel(travelId);
  }

  async getManyTravels(
    travelMaxQuantity: number
  ): Promise<TravelDtoResponse[]> {
    return await this._travelRepository.getManyTravels(travelMaxQuantity);
  }
}
