import mongoose from "mongoose";

import { Schema } from "mongoose";
import { TravelGroup } from "./TravelGroup.js";
import { RatingSchema } from "./Rating.js";
import { TravelSchema } from "./Travel.js";

const UserSchema:Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    uniqueIdentification: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    numberPhone: {
        type: String,
        maxlength: 255,
        default: null
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    nationality: {
        type: String,
        required: true,
        maxlength: 255
    },
    gender: {
        type: String,
        require: true,
        maxlength: 255
    },
    rating: [RatingSchema],
    Travels:[TravelSchema]
});

export const User = mongoose.model('User', UserSchema);