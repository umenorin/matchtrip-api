import mongoose from "mongoose";

import { Schema } from "mongoose";
import { TravelGroup } from "./TravelGroup.js";
import { Message } from "./Message.js";

const ChatSchema: Schema = new Schema({
  
  travel: {
    type: String,
    require: true,
    maxLenght: 255,
  },
  messages: {
    type: Schema.Types.ObjectId, 
    ref: Message,
    required: true,
  },
    
});

export const Chat = mongoose.model("Rating", ChatSchema);
