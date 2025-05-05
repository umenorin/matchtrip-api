import { injectable } from "tsyringe";
import { TravelDtoRequest, TravelDtoResponse } from "../DTO/TravelDto.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Rating } from "../models/Rating.js";
import { Travel } from "../models/Travel.js";
import { CustomError } from "../errors/CustomError.js";
import { Chat } from "../models/Chat.js";

@injectable()
export class TravelRepository implements ITravelRepository {
  async register(travelDto: TravelDtoRequest): Promise<void> {
    try {
      // 1. Primeiro cria o Rating
      const newRating = await Rating.create({ ratings: [] });
      const newChat = await Chat.create({ messages: [] });

      // 2. Depois cria o Travel com a referência
      await Travel.create({
        // Basic info (original Travel fields)
        name: travelDto.name,
        description: travelDto.description,

        // Location data
        country: travelDto.country,
        city: travelDto.city,
        latitude: travelDto.latitude,
        longitude: travelDto.longitude,

        // Dates (original Travel fields)
        startDate: travelDto.startDate,
        endDate: travelDto.endDate,

        // Group-related fields (moved from GroupTravel)
        travelLimit: travelDto.limitTravelers, // Previously maxMembers in GroupTravel

        // Relationships
        rating: newRating._id,
        chat: newChat._id,
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
      const travel: any = await Travel.findOne({ _id: travelID })
        .populate({
          path: "chat",
          populate: {
            path: "messages",
            select: "content sender createdAt", // Only include necessary fields
            options: { sort: { createdAt: -1 } }, // Newest messages first
          },
        })
        .lean();

      if (!travel) {
        throw new CustomError("Travel don't found", 400);
      }

      return new TravelDtoResponse({
        id: travel._id.toString(),
        name: travel.name,
        description: travel.description,
        country: travel.country,
        city: travel.city,
        latitude: travel.latitude,
        longitude: travel.longitude,
        startDate: travel.startDate,
        endDate: travel.endDate,
        limitTravelers: travel.limitTravelers,
        rating: {
          id: travel.rating._id,
          averageScore: travel.rating.averageRating, // Assuming this exists
          userRatings:
            travel.rating.ratings?.map((r: any) => ({
              userId: r.userId.toString(), // Changed from travelerOfUser to userId for consistency
              score: r.score,
            })) || [],
        },
        chat: {
          id: travel.chat._id,
          messageCount: travel.chat.messages?.length || 0, // Assuming messages array exists
        },
        createdAt: travel.createdAt,
        updatedAt: travel.updatedAt,
      });
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }

  async getManyTravels(maxTravels: number): Promise<TravelDtoResponse[]> {
    try {
      const allTravels = await Travel.find()
        .lean()
        .populate({
          path: "chat",
          populate: {
            path: "messages",
            select: "content sender createdAt", // Only include necessary fields
            options: { sort: { createdAt: -1 } }, // Newest messages first
          },
        })
        .exec();
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
            id: travel._id.toString(),
            name: travel.name,
            description: travel.description,
            country: travel.country,
            city: travel.city,
            latitude: travel.latitude,
            longitude: travel.longitude,
            startDate: travel.startDate,
            endDate: travel.endDate,
            limitTravelers: travel.limitTravelers,
            rating: {
              id: travel.rating._id,
              averageScore: travel.rating.averageRating, // Assuming this exists
              userRatings:
                travel.rating.ratings?.map((r: any) => ({
                  userId: r.userId.toString(), // Changed from travelerOfUser to userId for consistency
                  score: r.score,
                })) || [],
            },
            chat: {
              id: travel.chat._id,
              messageCount: travel.chat.messages?.length || 0, // Assuming messages array exists
            },
            createdAt: travel.createdAt,
            updatedAt: travel.updatedAt,
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
