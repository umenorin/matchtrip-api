import mongoose from "mongoose";

import { Schema } from "mongoose";
import { TravelGroup } from "./TravelGroup.js";
import { Rating } from "./Rating.js";

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
    rating: {
	type: Schema.Types.ObjectId,
	ref: "Rating",
    },
    Travels:[{
	type: Schema.Types.ObjectId,
	ref: "TravelGroup"
    }]
});

export const User = mongoose.model('User', UserSchema);
