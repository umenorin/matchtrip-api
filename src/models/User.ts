import mongoose from "mongoose";

import { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  numberPhone: {
    type: String,
    maxlength: 255,
    default: null,
  },
  age: {
    type: Number,
    required: true,
  },
  uniqueIdentification: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

export const User = mongoose.model("User", UserSchema);
