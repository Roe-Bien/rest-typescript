import mongoose, { Schema } from 'mongoose';
import BookInterface from '../interfaces/book';

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    extraInformation: { type: String },
  },
  {
    timestamps: true,
  }
);

BookSchema.post<BookInterface>('save', function () {
  this.extraInformation = 'This is extra info added after the save';
});

export default mongoose.model<BookInterface>('Book', BookSchema);
