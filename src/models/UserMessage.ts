import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { Message } from "./Message.js";

const UserMessageSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    messageId: {
      type: Schema.Types.ObjectId,
      ref: Message,
      required: true,
    },
   
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  }
);

export const UserMessage = mongoose.model("UserMessage", UserMessageSchema);
