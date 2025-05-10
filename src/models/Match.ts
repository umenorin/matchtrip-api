import mongoose from "mongoose";

import { Schema } from "mongoose";

const MatchSchema: Schema = new Schema(
  {
    content: {
      type: String,
      ref:"Travel",
      required:true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  }
);

export const Match = mongoose.model("Match", MatchSchema);