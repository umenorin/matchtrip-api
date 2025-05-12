import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMatchRepository from "../Interfaces/IMatchRepository.js";
import MatchDto from "../DTO/MatchDto.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";
import { Match } from "../models/Match.js";

@injectable()
export class MatchRepository implements IMatchRepository {
  getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
    throw new Error("Method not implemented.");
  }
  getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
    throw new Error("Method not implemented.");
  }
  async createProbablyMatch(
    userId: string,
    travelId: string
  ): Promise<MatchDto | null> {
    const travel = await Travel.findById(travelId).exec();
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    if (!travel) {
      throw new CustomError("Travel not found", 400);
    }

    const match: any = await Match.create({
      travel: travel,
      traveler: user,
    });

    console.log("aaaaaaaaaaaa", match)
    const matchDto = new MatchDto({
      id: match._id,
      travel: match.travel,
      travaler: match.traveler,
    });
    return matchDto;
  }
  recuseMatch(userId: string, TravelId: string): boolean {
    throw new Error("Method not implemented.");
  }
}
