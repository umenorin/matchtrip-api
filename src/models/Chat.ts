import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { TravelGroup } from "./TravelGroup.js";
import { Message } from "./Message.js";

const ChatSchema:Schema = new Schema({
    travel:TravelGroup,
    messages: [Message],
    
});

export const Chat = mongoose.model('Rating', ChatSchema);