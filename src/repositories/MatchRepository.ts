import { injectable } from "tsyringe";
import { CustomError } from "../errors/CustomError.js";
import IMatchRepository from "../Interfaces/IMatchRepository.js";
import MatchDto from "../DTO/MatchDto.js";

@injectable()
export class MatchRepository implements IMatchRepository {
    getMatchbyTraveler(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    getMatchbyTravel(id: string): Promise<MatchDto[] | null> {
        throw new Error("Method not implemented.");
    }
    createProbablyMatch(usedId: string, TravelId: string): Promise<MatchDto | null> {
        throw new Error("Method not implemented.");
    }
    recuseMatch(userId: string, TravelId: string): boolean {
        throw new Error("Method not implemented.");
    }

    
}
