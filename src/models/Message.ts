import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";

const MessageSchema:Schema = new Schema({
    content:{
        type: String,
        require: true,
        maxLenght: 255
    },
    owner: [User],
    
});

export const Message = mongoose.model('Message', MessageSchema);