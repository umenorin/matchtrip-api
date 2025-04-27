class RatingOfUserDto {
  id?: string;
  userId: string;
  score: number;

  constructor({
    id,
    userId,
    score,
  }: {
    id?: string;

    userId: string;
    score: number;
  }) {
    this.id = id;
    this.userId = userId;
    this.score = score;
  }
}

export default RatingOfUserDto;
