import mongoose from "mongoose";

import { Schema } from "mongoose";

const TravelGroupSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  owner: {
    type: String,
    required: true,
  },
  limitTravelers: {
    type: Number,
  },
  travelers: [{ type: String }],
});

export const TravelGroup = mongoose.model("TravelGroup", TravelGroupSchema);
