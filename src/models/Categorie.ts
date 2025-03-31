import mongoose from "mongoose";

import { Schema } from "mongoose";

const CategoriesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

export const Categorie = mongoose.model("Categorie", CategoriesSchema);
