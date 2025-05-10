import { Travel } from "../models/Travel.js";
import { User } from "../models/User.js";

class MatchDto {
  id?: string;
  travaler?: any;
  travel: any;
  
  constructor({
    id,
    travaler,
    travel
  }: {
    id?: string;
    travel: typeof Travel;
    travaler: typeof User;
  }) {
    this.id = id;
    this.travaler = travaler;
    this.travel = travel;
  }
}

export default MatchDto