// src/repositories/RatingRepository.ts
import { IRatingRepository } from "../Interfaces/IRatingRepository.js";
import RatingDto from "../DTO/RatingDto.js";
import { injectable } from "tsyringe";
import { User } from "../models/User.js";
import { CustomError } from "../errors/CustomError.js";
import { Rating } from "../models/Rating.js";

@injectable()
export class RatingRepository implements IRatingRepository {
  

  findById(id: string): Promise<RatingDto > {
    throw new Error("Method not implemented");
  }

  async update(userRating: string, rating: RatingDto): Promise<RatingDto > {
    const isUserFind = await this.findUserExist(rating.ratings as string);
    if (!isUserFind) {
      throw new CustomError("This User doesn't exist", 400);
    }

    // Verifica se o rating existe
    const ratingExists = await Rating.findById(rating.);
    if (!ratingExists) {
      throw new CustomError("This Rating doesn't exist", 400);
    }

    // Atualiza ou adiciona a avaliação
    const result = await Rating.updateOne(
      { _id: rating.id },
      {
        // $addToSet só adiciona se não existir, $set atualiza se existir
        $set: {
          "ratings.$[elem].score": newScore,
        },
      },
      {
        arrayFilters: [{ "elem.travelerId": userId }],
        upsert: false,
      }
    );

    // Se nenhum documento foi modificado, significa que não encontrou o userId no array
    if (result.modifiedCount === 0) {
      // Adiciona nova avaliação
      await Rating.updateOne(
        { _id: rating.id },
        {
          $push: {
            ratings: {
              travelerId: userId,
              score: newScore,
            },
          },
        }
      );
    }

    return await Rating.findById(rating.id); // Retorna o documento atualizado

    throw new Error("Method incomplet");
  }

  async findUserExist(
      id:string
    ): Promise<boolean> {
      const isUserFinded = await User.findById(id);
     
  
      if (isUserFinded) {
        return true;
      }
      return false;
    }
}
