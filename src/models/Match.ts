import mongoose from "mongoose";

import { Schema } from "mongoose";
import MatchStatusEnum from "../Enums/MatchStatusEnum.js";

const MatchSchema: Schema = new Schema(
  {
    travel: {
      type: Schema.Types.ObjectId,
      ref:"Travel",
      required:true
    },
    traveler: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status:{
      type: MatchStatusEnum
    }
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  }
);

export const Match = mongoose.model("Match", MatchSchema);