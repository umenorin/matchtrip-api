import mongoose from "mongoose";

import { Schema } from "mongoose";

export const RatingSchema: Schema = new Schema({
  ratings: [
    {
      userId: {
        type: String,
        required: true,
        maxlength: 255,
      },
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    },
  ],
});

export const Rating = mongoose.model("Rating", RatingSchema);
