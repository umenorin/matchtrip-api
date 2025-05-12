import MatchStatusEnum from "../Enums/MatchStatusEnum.js";
import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";

class MatchDto {
  id?: string;
  traveler?: any;
  travel: any;
  status: MatchStatusEnum; 
  constructor({
    id,
    traveler,
    travel,
    status,
  }: {
    id?: string;
    travel: typeof Travel;
    traveler: typeof User;
    status: MatchStatusEnum
  }) {
    this.id = id;
    this.traveler = traveler;
    this.travel = travel;
    this.status = status
  }
}

export default MatchDto