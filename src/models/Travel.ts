import mongoose from "mongoose";

import { Schema } from "mongoose";
import { RatingSchema } from "./Rating.js";

export const TravelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  latitude: {
    type: String,
    required: true,
    maxlength: 255,
  },
  Longitude: {
    type: Number,
    required: false,
  },
  city: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: true,
    maxlength: 255,
  },
  rating: RatingSchema,
});

export const Travel = mongoose.model("Travel", TravelSchema);
