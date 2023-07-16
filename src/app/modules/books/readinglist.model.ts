import { Schema, model } from "mongoose";
import { IReading } from "./interface";
const ReadingSchema = new Schema<IReading>({
  title: {
    type: String,
    required: true,
  },
  readingStatus: {
    type: Boolean,
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

const Read = model<IReading>("Read", ReadingSchema);

export default Read;
