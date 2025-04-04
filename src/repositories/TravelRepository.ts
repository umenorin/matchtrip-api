import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Travel } from "../models/Travel.js";

export class TravelRepository implements ITravelRepository {
  async register(travelDto: TravelDtoRequest): Promise<void> {
    try {
      const teste = await Travel.create({
        name: travelDto.name,
        latitude: travelDto.latitude,
        longitude: travelDto.longitude,
        city: travelDto.city,
        country: travelDto.country,
      });
      
    } catch (error) {
      console.error("Error creating travel:", error);
      throw new Error("Failed to create travel record");
    }
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
