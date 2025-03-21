import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { Categorie } from "./Categorie.js";
import { Rating } from "./Rating.js";

const TravelGroupSchema:Schema = new Schema({
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
    rating: Rating,
});

export const TravelGroup = mongoose.model('TravelGroup', TravelGroupSchema);