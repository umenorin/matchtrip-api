import { injectable } from "tsyringe";
import { TravelDtoRequest, TravelDtoResponse } from "../DTO/TravelDto.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Rating } from "../models/Rating.js";
import { Travel } from "../models/Travel.js";
import { CustomError } from "../errors/CustomError.js";

@injectable()
export class TravelRepository implements ITravelRepository {
  async register(travelDto: TravelDtoRequest): Promise<void> {
    try {
      // 1. Primeiro cria o Rating
      const newRating = await Rating.create({ ratings: [] });

      // 2. Depois cria o Travel com a referência
      await Travel.create({
        name: travelDto.name,
        latitude: travelDto.latitude,
        longitude: travelDto.longitude,
        city: travelDto.city,
        country: travelDto.country,
        rating: newRating._id,
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

  async getTravel(travelID: string): Promise<TravelDtoResponse> {
    try {
      const travel: any = await Travel.findOne({ _id: travelID }).lean();

      if (!travel) {
        throw new CustomError("Travel don't found", 400);
      }

      return new TravelDtoResponse({
        id: travel._id as string,
        name: travel.name as string,
        latitude: travel.latitude as number,
        longitude: travel.longitude as number,
        city: travel.city as string,
        country: travel.country as string,
        rating: {
          id: travel.rating._id, // Usa o ObjectId diretamente
          // Adicione outros campos do rating se necessário
          userRatings: travel.rating.ratings?.map((r: any) => ({
            userId: r.travelerOfUser.toString(),
            score: r.score,
          })),
        },
      });
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }

  async getManyTravels(maxTravels: number): Promise<TravelDtoResponse[]> {
    try {
      const allTravels = await Travel.find().lean().exec();
      console.log("travels", allTravels);
      const shuffledTravels = allTravels.sort(() => 0.5 - Math.random());
      const selectedTravels = shuffledTravels.slice(0, maxTravels);
      const travelDtoarray: TravelDtoResponse[] = [];
      if (!selectedTravels) {
        throw new CustomError("Travels don't found", 400);
      }

      selectedTravels.forEach((travel: any) => {
        travelDtoarray.push(
          new TravelDtoResponse({
            id: travel._id as string,
            name: travel.name as string,
            latitude: travel.latitude as number,
            longitude: travel.longitude as number,
            city: travel.city as string,
            country: travel.country as string,
            rating: {
              id: travel.rating._id, // Usa o ObjectId diretamente
              // Adicione outros campos do rating se necessário
              userRatings: travel.rating.ratings?.map((r: any) => ({
                userId: r.travelerOfUser.toString(),
                score: r.score,
              })),
            },
          })
        );
      });

      return travelDtoarray;
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }
}
