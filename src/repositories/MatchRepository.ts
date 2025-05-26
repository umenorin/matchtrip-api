import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMatchRepository from "../Interfaces/IMatchRepository.js";
import MatchDto from "../DTO/MatchDto.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";
import { Match } from "../models/Match.js";
import MatchStatusEnum from "../Enums/MatchStatusEnum.js";
import { GroupTravalers } from "../models/GroupTravalers.js";
import { UserTravel } from "../models/UserTravel.js";

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
          status: match.status,
        }),
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
          status: match.status,
        }),
      );
    });

    return matchsDto;
  }

  async createProbablyMatch(
    userId: string,
    travelId: string,
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

    const matchDto = new MatchDto({
      id: match._id,
      travel: match.travel,
      traveler: match.traveler,
      status: MatchStatusEnum.PENDING,
    });
    return matchDto;
  }

  async recuseMatch(userId: string, matchId: string): Promise<MatchDto> {
    const user: any = await User.findById(userId);
    const match: any = await Match.findById(matchId).populate("travel");

    if (!user) throw new CustomError("User not found", 400);
    if (!match) throw new CustomError("Match don't found", 400);
    if (user._id.toString() !== match.travel.owner.toString())
      throw new CustomError("You aren't the owner for recuse this match", 401);
    if (match.status == MatchStatusEnum.REJECTED)
      throw new CustomError("This match has already recused", 400);

    match.status = MatchStatusEnum.REJECTED;
    match.updatedAt = new Date();
    const matchRecused = await match.save();
    return new MatchDto({
      id: matchRecused._id,
      traveler: matchRecused.traveler,
      travel: matchRecused.travel,
      status: matchRecused.status,
    });
  }

  async acceptMatch(userId: string, matchId: string): Promise<MatchDto> {
    const user: any = await User.findById(userId);
    const match: any = await Match.findById(matchId).populate("travel");
    console.log();
    if (!user) throw new CustomError("User not found", 400);
    if (!match) throw new CustomError("Match don't found", 400);
    if (user._id.toString() !== match.travel.owner.toString())
      throw new CustomError("You aren't the owner for recuse this match", 401);
    if (match.status == MatchStatusEnum.REJECTED)
      throw new CustomError("This match has already recused", 400);
    const travelers = await GroupTravalers.countDocuments({
      travel: match.travel,
    });
    console.log("Traveler in Travel: ", travelers);
    if (travelers >= match.travel.limitTravelers)
      throw new CustomError("Your group don't have more space", 400);

    match.status = MatchStatusEnum.ACCEPTED;
    match.updatedAt = new Date();
    const matchAccept = await match.save();
    await GroupTravalers.create({ traveler: match.traveler, travel: match.travel });

    return new MatchDto({
      id: matchAccept._id,
      traveler: matchAccept.traveler,
      travel: matchAccept.travel,
      status: matchAccept.status,
    });
  }
}
