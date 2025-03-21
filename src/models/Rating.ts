import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";

const RatingSchema:Schema = new Schema({
    score:{
        type:Number,
        default:0
    },
    travelerWhoRating: [User],
    
});

export const Rating = mongoose.model('Rating', RatingSchema);