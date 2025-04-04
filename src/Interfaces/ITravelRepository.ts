import TravelDtoRequest from "../DTO/TravelDtoRequest.js";

interface ITravelRepository {
  register(travelDto: TravelDtoRequest): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travel: TravelDtoRequest): void;
}

export default ITravelRepository;
