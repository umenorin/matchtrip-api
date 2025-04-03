import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";

export class TravelRepository implements ITravelRepository{

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
}