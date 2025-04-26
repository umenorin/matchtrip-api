import { injectable } from "tsyringe";
import TravelDtoRequest from "../DTO/TravelDto.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Rating } from "../models/Rating.js";
import { Travel } from "../models/Travel.js";
import { CustomError } from "../errors/CustomError.js";
import TravelDto from "../DTO/TravelDto.js";

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
        Rating: new Rating(),
      });
    } catch (error) {
      console.error("Error creating travel:", error);
      throw new Error("Failed to create travel record");
    }
  }

  async deleteTravel(travelId: string): Promise<void> {
    try {
      await Travel.findOneAndDelete({ _id: travelId }).lean();
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
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
        }
      ).lean();
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }

  async getTravel(travelID: string): Promise<TravelDto> {
    try {
      const travel = await Travel.findOne({ _id: travelID }).lean();

      if (!travel) {
        throw new CustomError("Travel don't found", 400);
      }

      return new TravelDto({
        id: travel._id as string,
        name: travel.name as string,
        latitude: travel.latitude as number,
        longitude: travel.longitude as number,
        city: travel.city as string,
        country: travel.country as string,
        rating: travel.rating as typeof Rating,
      });
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }

  async getManyTravels(maxTravels: number): Promise<TravelDto[]> {
    try {
      const allTravels = await Travel.find().lean().exec();
      console.log("travels",allTravels)
      const shuffledTravels = allTravels.sort(() => 0.5 - Math.random());
      const selectedTravels = shuffledTravels.slice(0, maxTravels);
      const travelDtoarray:TravelDto[] = []
      if (!selectedTravels) {
        throw new CustomError("Travels don't found", 400);
      }

      
      selectedTravels.forEach(travel => {
        travelDtoarray.push( new TravelDto({
          id: travel._id as string,
          name: travel.name as string,
          latitude: travel.latitude as number,
          longitude: travel.longitude as number,
          city: travel.city as string,
          country: travel.country as string,
          rating: travel.rating as typeof Rating,
        })
      );

    });

    return travelDtoarray

    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }
}
