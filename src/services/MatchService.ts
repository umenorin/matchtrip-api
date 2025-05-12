import { inject, injectable } from "tsyringe";
import IChatService from "../Interfaces/IChatService.js";
import ChatDto from "../DTO/ChatDto.js";
import IChatRepository from "../Interfaces/IChatRepository.js";
import IMatchService from "../Interfaces/IMatchService.js";
import MatchDto from "../DTO/MatchDto.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";
import { CustomError } from "../errors/CustomError.js";
import IMatchRepository from "../Interfaces/IMatchRepository.js";

@injectable()
export class MatchService implements IMatchService {
  constructor(
    @inject("IMatchRepository") private _matchRepository: IMatchRepository
  ) {}
    getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    async createProbablyMatch(userId: string, travelId: string): Promise<MatchDto | null> {
        
        const matchDto = await this._matchRepository.createProbablyMatch(userId,travelId)
        return matchDto
    }
    recuseMatch(userId: string, TravelId: string): boolean {
        throw new Error("Method not implemented.");
    }

 
}
