import mongoose from "mongoose";

import { Schema } from "mongoose";
import { RatingOfUser } from "./RatingOfUser.js";

export const RatingSchema: Schema = new Schema({
  ratings: [
    {
      travelerOfUser: {
        type: Schema.Types.ObjectId,
        ref: RatingOfUser,
        required: true,
      },
    },
  ],
});

export const Rating = mongoose.model("Rating", RatingSchema);
