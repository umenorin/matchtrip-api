import TravelDtoResponse from "../DTO/TravelDtoResponse.js";
import TravelDtoRequest from "../DTO/TravelDtoRequest.js";

interface ITravelSevice {
  createTravel(travelDto: TravelDtoRequest): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travelId: string): Promise<TravelDtoResponse>;
  getManyTravels(travelMaxQuantity: number): Promise<TravelDtoResponse[]>;
}

export default ITravelSevice;
