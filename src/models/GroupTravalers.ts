import mongoose from "mongoose";

import { Schema } from "mongoose";

const GroupTravalersSchema: Schema = new Schema(
  {
    travel: {
      type: Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
    },
    traveler: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  }
);

export const GroupTravalers = mongoose.model("GroupTravalers", GroupTravalersSchema);