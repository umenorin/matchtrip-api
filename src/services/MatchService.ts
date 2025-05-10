import { inject, injectable } from "tsyringe";
import IChatService from "../Interfaces/IChatService.js";
import ChatDto from "../DTO/ChatDto.js";
import IChatRepository from "../Interfaces/IChatRepository.js";
import IMatchService from "../Interfaces/IMatchService.js";
import MatchDto from "../DTO/MatchDto.js";
import { Travel } from "../models/Travel.js";

@injectable()
export class MatchService implements IMatchService {
  constructor(
    @inject("IChatRepository") private _chatRepository: IChatRepository
  ) {}
    getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    async createProbablyMatch(usedId: string, travelId: string): Promise<MatchDto | null> {
        const travel = await Travel.findById(travelId).exec()
        
        throw new Error("Method not implemented.");
    }
    recuseMatch(userId: string, TravelId: string): boolean {
        throw new Error("Method not implemented.");
    }

 
}
