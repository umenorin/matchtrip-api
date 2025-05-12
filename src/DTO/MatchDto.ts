import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";

class MatchDto {
  id?: string;
  traveler?: any;
  travel: any;
  
  constructor({
    id,
    traveler,
    travel
  }: {
    id?: string;
    travel: typeof Travel;
    traveler: typeof User;
  }) {
    this.id = id;
    this.traveler = traveler;
    this.travel = travel;
  }
}

export default MatchDto