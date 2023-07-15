import { Model, Types } from "mongoose";
// Define the book schema
export interface IBook {
  userEmail?: string;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: string[];
}
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};
