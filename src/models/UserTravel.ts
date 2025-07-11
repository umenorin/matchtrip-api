import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { Travel } from "./Travel.js";

const UserTravelSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    travelId: {
      type: Schema.Types.ObjectId,
      ref: Travel,
      required: true,
    },
    isOwner: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  }
);

export const UserTravel = mongoose.model("UserTravel", UserTravelSchema);
