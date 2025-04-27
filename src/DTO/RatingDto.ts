import RatingOfUserDto from "./RatingOfUserDto.js";

class RatingDto {
  id?: string;
  ratingOfUser: RatingOfUserDto[];

  constructor({
    id,
    ratingOfUser,
  }: {
    id?: string;
    ratingOfUser: RatingOfUserDto[];
  }) {
    this.id = id;
    this.ratingOfUser = ratingOfUser;
  }
}

export default RatingDto;
