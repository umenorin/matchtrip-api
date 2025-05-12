import MatchDto from "../DTO/MatchDto.js";

interface IMatchRepository {

  getMatchbyTraveler(id: string): Promise<MatchDto[] | null>;
  getMatchbyTravel(id: string): Promise<MatchDto[] | null>;
  createProbablyMatch(usedId:string,TravelId:string) :Promise<MatchDto | null>;
  recuseMatch(userId:string,matchId:string):Promise<boolean>
  acceptMatch(userId:string,matchId:string): Promise<boolean>
}


export default IMatchRepository;

