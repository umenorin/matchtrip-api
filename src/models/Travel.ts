import mongoose from "mongoose";

import { Schema } from "mongoose";
import { Rating } from "./Rating.js";

export const TravelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: true,
    maxlength: 255,
  },
  country: {
    type: String,
    required: true,
    maxlength: 255,
  },
  rating: {
    type: Schema.Types.ObjectId,
    ref: Rating,
    required: true,
  },
});

export const Travel = mongoose.model("Travel", TravelSchema);
