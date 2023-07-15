import { Schema, model } from "mongoose";
import { IBook } from "./books.interface";
const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  reviews: [
    {
      type: String,
    },
  ],
});

const Wishlist = model<IBook>("Wishlist", bookSchema);

export default Wishlist;
