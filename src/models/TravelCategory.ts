import mongoose from "mongoose";

import { Schema } from "mongoose";
import { Category } from "./Categorie.js";
import { Travel } from "./Travel.js";

const TravelCategorySchema: Schema = new Schema(
  {
    travelId: {
      type: Schema.Types.ObjectId,
      ref: Travel,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente
  },
);

export const TravelCategory = mongoose.model(
  "TravelCategory",
  TravelCategorySchema,
);
