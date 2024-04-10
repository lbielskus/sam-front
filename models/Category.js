import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  customId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  images: [{ type: String }],
});

let CategoryModel;

try {
  CategoryModel = mongoose.model('Category');
} catch {
  CategoryModel = mongoose.model('Category', categorySchema);
}

export default CategoryModel;
