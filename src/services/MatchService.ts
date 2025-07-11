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
    
    async getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
        const matchDtoArrary:any = await this._matchRepository.getMatchbyTraveler(id);
        return matchDtoArrary
    }
    async getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
        const matchDtoArrary:any = await this._matchRepository.getMatchbyTravel(id);
        return matchDtoArrary
    }
    async createProbablyMatch(userId: string, travelId: string): Promise<MatchDto | null> {
        
        const matchDto = await this._matchRepository.createProbablyMatch(userId,travelId)
        return matchDto
    }
    async recuseMatch(userId: string, matchId: string): Promise<MatchDto> {
        const matchDtoRecused = await this._matchRepository.recuseMatch(userId,matchId)
        return matchDtoRecused 
    }
    
    async acceptMatch(userId: string, matchId: string): Promise<MatchDto> {
        const matchDtoAccept = await this._matchRepository.acceptMatch(userId,matchId)
        return matchDtoAccept 
    }
}
