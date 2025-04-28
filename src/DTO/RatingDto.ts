import RatingOfUserDto from "./RatingOfUserDto.js";

class RatingDto {
  id?: string;
  ratingOfUser: RatingOfUserDto[];
  totalScore?: number;
  constructor({
    id,
    ratingOfUser,
    totalScore,
  }: {
    id?: string;
    ratingOfUser: RatingOfUserDto[];
    totalScore?: number;
  }) {
    this.id = id;
    this.ratingOfUser = ratingOfUser;
    this.totalScore = totalScore;
  }
}

export default RatingDto;
