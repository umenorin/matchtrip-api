class RatingDto {
  id?: string;	
  score: number;
  TravelerWhosRating: string;

  constructor({
    id,
    score,
    TravelerWhosRating,
  } : {
      id?: string;
      score: number;
      TravelerWhosRating: string;
  }) {
      this.id = id;
      this.score = score;
      this.TravelerWhosRating = TravelerWhosRating;
  }
}

export default RatingDto
