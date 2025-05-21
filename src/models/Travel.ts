import mongoose from "mongoose";

import { Schema } from "mongoose";
import { Rating } from "./Rating.js";
import { Chat } from "./Chat.js";
import { User } from "./User.js";

export const TravelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },

    country: {
      type: String,
      required: true,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
      maxlength: 255,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },

    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    limitTravelers: {
      type: Number,
    },

    rating: {
      type: Schema.Types.ObjectId,
      ref: Rating,
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: Chat,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  },
);

export const Travel = mongoose.model("Travel", TravelSchema);
