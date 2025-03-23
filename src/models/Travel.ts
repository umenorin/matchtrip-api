import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { Categorie } from "./Categorie.js";
import { RatingSchema } from "./Rating.js";

export const TravelSchema:Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        maxlength: 255
    },
    country: {
        type: String,
        required: true,
        maxlength: 255
    },
    endDate: {
        type: Date,
    },
    rating: RatingSchema
});

export const Travel = mongoose.model('Travel', TravelSchema);