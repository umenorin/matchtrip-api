// src/repositories/RatingRepository.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { injectable } from "tsyringe";
import { User } from "../models/User.js";
import { CustomError } from "../errors/CustomError.js";
import { Rating } from "../models/Rating.js";
import RatingOfUserDto from "../DTO/RatingOfUserDto.js";

@injectable()
export class RatingRepository implements IRatingRepository {
  findById(id: string): Promise<RatingDto> {
    throw new Error("Method not implemented");
  }

  async update(rating: RatingDto): Promise<RatingDto> {
    try {
      const newRating = rating.ratingOfUser[0].userId;
      const isUserFind = await this.findUserExist(newRating);
      if (!isUserFind) {
        throw new CustomError("This User doesn't exist", 400);
      }

      // Verifica se o rating existe
      const ratingExists: any = await Rating.findById(rating.id).exec();
      if (!ratingExists) {
        throw new CustomError("This Rating doesn't exist", 400);
      }
      console.log("rating: ", ratingExists);
      // Verifica se o usuário já avaliou
      // Verificação segura com todas as validações necessárias
      const userRatingExists = await this.hasUserRated(
        rating.id as string,
        rating.ratingOfUser[0].userId
      );
      console.log("awdhuiwahduaiwdhiawd ", userRatingExists);

      if (userRatingExists) {
        // Atualiza a avaliação existente
        await Rating.updateOne(
          {
            _id: rating.id,
            "ratings.userId": newRating, // Encontra o documento com o userId específico
          },
          {
            $set: { "ratings.$.score": rating.ratingOfUser[0].score }, // Usa $ para referenciar o elemento encontrado
          }
        );
      } else {
        // Adiciona a nova avaliação ao rating principal
        const teste = await Rating.updateOne(
          { _id: rating.id },
          {
            $push: {
              ratings: {
                score: rating.ratingOfUser[0].score,
                userId: rating.ratingOfUser[0].userId,
              },
            },
          }
        ).exec();
      }

      // Retorna o rating atualizado
      const ratingUpdated: any = await Rating.findById(rating.id)
        .populate("ratings")
        .exec();
      if (!ratingUpdated) {
        throw new Error("Rating not found");
      }

      // Mapeia cada rating para o DTO correspondente
      const ratingOfUserDtos = ratingUpdated.ratings.map((rating: any) => {
        console.log("teajdmwaiodjaowdjiawdioaw: ",rating)
        return new RatingOfUserDto({
          id: rating._id,
          userId: rating.userId,
          score: rating.score,
          // inclua outros campos necessários aqui
        });
      });

      const ratingUpdatedDto = new RatingDto({
        id: ratingUpdated._id.toString(),
        ratingOfUser: ratingOfUserDtos,
      });
      return ratingUpdatedDto;
    } catch (error: any) {
      console.log("error: ", error);
      throw new CustomError("error in set the rating", 400);
    }
  }

  private async findUserExist(id: string): Promise<boolean> {
    const isUserFinded = await User.findById(id);

    if (isUserFinded) {
      return true;
    }
    return false;
  }

  private async hasUserRated(ratingId: string, userId: string) {
    const rating = await Rating.findOne({
      _id: ratingId,
      "ratings.userId": userId,
    });
    return rating !== null;
  }
}
