import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";

interface ITravelRepository {
  register(travelDto: TravelDtoRequest): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travelID: string): Promise<TravelDtoResponse>;
  getManyTravels(maxTravels: number): Promise<TravelDtoResponse[]>;
}

export default ITravelRepository;
