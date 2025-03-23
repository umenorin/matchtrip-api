import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";

export const RatingSchema:Schema = new Schema({
    score:{
        type:Number,
        default:0
    },
    travelerWhoRating: [{
        type:String,
        maxlength: 255
    }],
    
});

export const Rating = mongoose.model('Rating', RatingSchema);
