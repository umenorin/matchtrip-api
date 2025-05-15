import { injectable } from "tsyringe";
import TravelDtoRequest  from "../DTO/TravelDtoRequest.js";
import ITravelRepository from "../Interfaces/ITravelRepository.js";
import { Rating } from "../models/Rating.js";
import { Travel } from "../models/Travel.js";
import { CustomError } from "../errors/CustomError.js";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";
import { GroupTravalers } from "../models/GroupTravalers.js";
import TravelDtoResponse from "../DTO/TravelDtoResponse.js";

@injectable()
export class TravelRepository implements ITravelRepository {
  async register(travelDto: TravelDtoRequest): Promise<void> {
    try {
      // 1. Primeiro cria o Rating
      const newRating = await Rating.create({ ratings: [] });
      const newChat = await Chat.create({ messages: [] });
      const user = await User.findById(travelDto.owner);
      if (!user) {
        throw new CustomError("user doesn't exist", 400);
      }
      console.log("Travel dto :", travelDto);
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
        owner: user,
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

      const travelers: any = await GroupTravalers.find({
        travel: travel._id.toString(),
      }).populate({
        path: "traveler",
        select: "-password", // Isso exclui o campo 'password' do resultado
      });

      return new TravelDtoResponse({
        id: travel._id.toString(),
        owner: travel.owner,
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
        travalers: travelers,
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

      const shuffledTravels = allTravels.sort(() => 0.5 - Math.random());
      const selectedTravels = shuffledTravels.slice(0, maxTravels);
      const travelDtoarray: TravelDtoResponse[] = [];
      if (!selectedTravels) {
        throw new CustomError("Travels don't found", 400);
      }

      await Promise.all(
        selectedTravels.map(async (travel: any) => {
          if (!travel) return; // Se travel for null/undefined, pula para a próxima iteração

          console.log("Processando viagem:", travel._id?.toString());

          const travelers: any = await GroupTravalers.find({
            travel: travel._id?.toString(),
          }).populate({
            path: "traveler",
            select: "-password",
          });

          travelDtoarray.push(
            new TravelDtoResponse({
              id: travel._id?.toString(),
              name: travel.name,
              owner: travel.owner,
              description: travel.description,
              country: travel.country,
              city: travel.city,
              latitude: travel.latitude,
              longitude: travel.longitude,
              startDate: travel.startDate,
              endDate: travel.endDate,
              limitTravelers: travel.limitTravelers,
              rating: {
                id: travel.rating?._id || null, // Se rating for null, define id como null
                averageScore: travel.rating?.averageRating || 0, // Se não existir, usa 0
                userRatings:
                  travel.rating?.ratings?.map((r: any) => ({
                    userId: r.userId?.toString(),
                    score: r.score,
                  })) || [],
              },
              chat: {
                id: travel.chat?._id || null, // Se chat for null, define id como null
                messageCount: travel.chat?.messages?.length || 0,
              },
              createdAt: travel.createdAt,
              updatedAt: travel.updatedAt,
              travalers: travelers || [], // Se travelers for null/undefined, usa array vazio
            })
          );
        })
      );

      return travelDtoarray;
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) throw new CustomError(error.message, 400);
      throw error;
    }
  }
}
