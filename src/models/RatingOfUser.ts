import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";

export const RatingOfUserSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },

  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

export const RatingOfUser = mongoose.model("RatingOfUser", RatingOfUserSchema);
