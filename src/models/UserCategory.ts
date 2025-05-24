import mongoose from "mongoose";

import { Schema } from "mongoose";
import { User } from "./User.js";
import { Category } from "./Categorie.js";

const UserCategorySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
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

export const UserCategory = mongoose.model("UserCategory", UserCategorySchema);
