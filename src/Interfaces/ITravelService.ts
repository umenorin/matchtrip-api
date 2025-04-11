import TravelDto from "../DTO/TravelDto.js";

interface ITravelSevice {
  createTravel(travelDto: TravelDto): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDto): void;
  getTravel(travelId: string): Promise<TravelDto>;
  // This method have the objective get the  travels in the DB until to get the travelMaxQuantity valor
  getTravels(travelMaxQuantity: number): Promise<TravelDto[]>;
}

export default ITravelSevice;
