import { injectable } from "tsyringe";
import TravelDtoRequest from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Rating } from "../models/Rating.js";
import { Travel } from "../models/Travel.js";
import { CustomError } from "../errors/CustomError.js";
import instance from "tsyringe/dist/typings/dependency-container.js";

@injectable()
export class TravelRepository implements ITravelRepository {
  async register(travelDto: TravelDtoRequest): Promise<void> {
    try {
      await Travel.create({
        name: travelDto.name,
        latitude: travelDto.latitude,
        longitude: travelDto.longitude,
        city: travelDto.city,
        country: travelDto.country,
        Rating: new Rating({}),
      });
    } catch (error) {
      console.error("Error creating travel:", error);
      throw new Error("Failed to create travel record");
    }
  }

  deleteTravel(travelId: string): void {
    throw new Error("Method not implemented.");
  }

  async editTravel(travel: TravelDtoRequest): Promise<void> {
    try {
      await Travel.findOneAndUpdate(
        { _id: travel.id },
        {
          name: travel.name,
          latitude: travel.latitude,
          longitude: travel.longitude,
          city: travel.city,
          country: travel.country,
        },
        { new: true }
      ).lean();
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }

  getTravel(travelID: string): TravelDtoRequest {
    throw new Error("Method not implemented.");
  }
}
