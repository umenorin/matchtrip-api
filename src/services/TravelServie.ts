import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import ITravelSevice from "../Interfaces/ITravelService.js";

export class TravelService implements ITravelSevice{
    createTravel(): void {
        throw new Error("Method not implemented.");
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