import TravelDtoRequest from "../DTO/TravelDtoRequest.js";

interface ITravelRepository {
  register(travelDto: TravelDtoRequest): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travelID: string): TravelDtoRequest;
}

export default ITravelRepository;
