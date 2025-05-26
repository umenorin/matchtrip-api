import mongoose from "mongoose";

import { Schema } from "mongoose";
import { Rating } from "./Rating.js";
import { Chat } from "./Chat.js";
import { User } from "./User.js";
import TravelStatusEnum from "../Enums/TravelStatusEnum.js";

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
   

    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    limitTravelers: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(TravelStatusEnum),
      default: TravelStatusEnum.ONGOIN,
      required: true,
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
    imageTravel: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  },
);

export const Travel = mongoose.model("Travel", TravelSchema);
