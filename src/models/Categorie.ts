import mongoose, { Document, Schema } from "mongoose"

export interface CategoryDocument extends Document {
  name: string;
}

const CategoriesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

export const Category = mongoose.model<CategoryDocument>("Category", CategoriesSchema);
