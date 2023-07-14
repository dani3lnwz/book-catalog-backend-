import { Model, Types } from "mongoose";
// Define the book schema
export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: string[];
}
export type CowModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
};
