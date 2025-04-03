import TravelDtoRequest from "../DTO/TravelDtoRequest.js";

interface ITravelRepository {
  createTravel(): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travel: TravelDtoRequest): void;
}

export default ITravelRepository;
