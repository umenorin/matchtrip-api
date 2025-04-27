// src/repositories/RatingRepository.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { injectable } from "tsyringe";
import { User } from "../models/User.js";
import { CustomError } from "../errors/CustomError.js";
import { Rating } from "../models/Rating.js";
import RatingOfUserDto from "../DTO/RatingOfUserDto.js";
import { RatingOfUser } from "../models/RatingOfUser.js";

@injectable()
export class RatingRepository implements IRatingRepository {
  findById(id: string): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }

  async update(rating: RatingDto): Promise<RatingDto> {
    const newRating = rating.ratingOfUser[0].userId
    const isUserFind = await this.findUserExist(newRating);
    if (!isUserFind) {
      throw new CustomError("This User doesn't exist", 400);
    }

    // Verifica se o rating existe
    const ratingExists:any = await Rating.findById(rating.id).exec();
    if (!ratingExists) {
      throw new CustomError("This Rating doesn't exist", 400);
    }
    
    // Verifica se o usuário já avaliou
    const userRatingExists = ratingExists.ratings.some(
      (rating: any) => rating.travelerOfUser.toString() === newRating
    );

    if (userRatingExists) {
      // Atualiza a avaliação existente
      await Rating.updateOne(
        {
          _id: rating.id,
          "ratings.travelerOfUser": newRating,
        },
        {
          $set: { "ratings.$.score": rating.ratingOfUser[0].score },
        }
      );
    } else {
      // Cria uma nova avaliação do usuário
      const newUserRating:any = await this.CreateRatingOfUser(rating.ratingOfUser[0])

      // Adiciona a nova avaliação ao rating principal
      await Rating.updateOne(
        { _id: rating.id },
        {
          $push: {
            ratings: { travelerOfUser: newUserRating._id },
          },
        }
      );
    }

    // Retorna o rating atualizado
    const ratingUpdated:any = await Rating.findById(rating.id)
      .populate("ratings.travelerOfUser")
      .exec();

    if (!ratingUpdated) {
      throw new Error("Rating not found");
    }

    // Mapeia cada rating para o DTO correspondente
    const ratingOfUserDtos = ratingUpdated.ratings.map((rating:any) => {
      return new RatingOfUserDto({
        id:rating._id,
        userId: rating.travelerOfUser._id.toString(),
        score: rating.travelerOfUser.score,
        // inclua outros campos necessários aqui
      });
    });

    const ratingUpdatedDto = new RatingDto({
      id: ratingUpdated._id.toString(),
      ratingOfUser: ratingOfUserDtos,
    });
    return ratingUpdatedDto;
  }

  async findUserExist(id: string): Promise<boolean> {
    const isUserFinded = await User.findById(id);

    if (isUserFinded) {
      return true;
    }
    return false;
  }

  async CreateRatingOfUser(ratingOfUser: RatingOfUserDto) {
    const isUserRatingHasCreated = await RatingOfUser.create({
      userId: ratingOfUser.userId,
      score: ratingOfUser.score,
    });
    if (isUserRatingHasCreated) return true;
    return false;
  }
}
