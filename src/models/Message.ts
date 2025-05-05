import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";

const MessageSchema: Schema = new Schema(
  {
    content: {
      type: String,
      require: true,
      maxLenght: 255,
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

export const Message = mongoose.model("Message", MessageSchema);
