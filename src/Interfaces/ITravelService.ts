import TravelDtoRequest from "../DTO/TravelDtoRequest.js"

interface ITravelSevice {
  createTravel(): void;
  deleteTravel(travelId: string): void;
  editTravel(travel: TravelDtoRequest): void;
  getTravel(travel: TravelDtoRequest): void;
  // This method have the objective get the  travels in the DB until to get the travelMaxQuantity valor
  getTravels(travelMaxQuantity: number): Array<TravelDtoRequest>;
}


export default ITravelSevice