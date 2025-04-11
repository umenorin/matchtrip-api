import TravelDto from "../DTO/TravelDto.js";

interface ITravelRepository {
  register(travelDto: TravelDto): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDto): void;
  getTravel(travelID: string): Promise<TravelDto>;
  getTravels(maxTravels: number): Promise<TravelDto[]>
}

export default ITravelRepository;
