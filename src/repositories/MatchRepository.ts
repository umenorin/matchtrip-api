import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMatchRepository from "../Interfaces/IMatchRepository.js";
import MatchDto from "../DTO/MatchDto.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";
import { Match } from "../models/Match.js";
import MatchStatusEnum from "../Enums/MatchStatusEnum.js";

@injectable()
export class MatchRepository implements IMatchRepository {
  async getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
    const matchs: any = await Match.find({ traveler: id })
      .populate("travel")
      .populate("traveler")
      .exec();
    const matchsDto: MatchDto[] = [];

    matchs.forEach((match: any) => {
      matchsDto.push(
        new MatchDto({
          id: match.id,
          traveler: match.traveler,
          travel: match.travel,
          status: match.status
        })
      );
    });

    return matchsDto;
  }

  async getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
    const matchs: any = await Match.find({ travel: id })
      .populate("travel")
      .populate("traveler")
      .exec();
    const matchsDto: MatchDto[] = [];
    matchs.forEach((match: any) => {
      matchsDto.push(
        new MatchDto({
          id: match.id,
          traveler: match.traveler,
          travel: match.travel,
          status: match.status
        })
      );
    });

    return matchsDto;
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

    console.log("aaaaaaaaaaaa", match);
    const matchDto = new MatchDto({
      id: match._id,
      travel: match.travel,
      traveler: match.traveler,
      status: MatchStatusEnum.PENDING
    });
    return matchDto;
  }

  async recuseMatch(userId: string, matchId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async acceptMatch(userId: string, matchId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
