import mongoose from "mongoose";

import { Schema } from "mongoose";
import { Message } from "./Message.js";

const ChatSchema: Schema = new Schema({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: Message,
      required: true,
    },
  ],
});

export const Chat = mongoose.model("Chat", ChatSchema);
