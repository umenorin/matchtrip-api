import mongoose from "mongoose";
import { Schema } from "mongoose";

export const RatingOfUserSchema: Schema = new Schema({
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
});

export const RatingOfUser = mongoose.model("RatingOfUser", RatingOfUserSchema);
