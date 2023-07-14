/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interface/pagination";
import { IBook } from "./books.interface";
import Book from "./books.model";

const createBook = async (BookData: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(BookData);
  return newBook;
};
const getLatestBooks = async (): Promise<IBook[]> => {
  const books = await Book.find().sort({ publicationDate: -1 }).limit(10);

  return books;
};
const getAllBooks = async (): Promise<IBook[]> => {
  const books = await Book.find();

  return books;
};

// const getAllBooks = async (
//   filters: IBookFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IBook[]>> => {
//   const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const whereConditions: any = {};

//   if (searchTerm) {
//     whereConditions.$or = BookSearchableFields.map((field) => ({
//       [field]: {
//         $regex: searchTerm,
//         $options: "i",
//       },
//     }));
//   }

//   if (minPrice !== undefined || maxPrice !== undefined) {
//     whereConditions.price = {};

//     if (minPrice !== undefined) {
//       whereConditions.price.$gte = minPrice;
//     }

//     if (maxPrice !== undefined) {
//       whereConditions.price.$lte = maxPrice;
//     }
//   }

//   if (Object.keys(filtersData).length) {
//     Object.entries(filtersData).forEach(([field, value]) => {
//       whereConditions[field] = value;
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const result = await Book.find(whereConditions)
//     .populate("seller")
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Book.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

// const updateBook = async (
//   id: string,
//   payload: Partial<IBook>,
//   userId: string
// ): Promise<IBook | null> => {
//   const Book = await Book.findOne({ _id: id });
//   if (!Book) {
//     throw new ApiError(404, "Book not found!");
//   }

//   if (Book.seller.toString() !== userId) {
//     throw new ApiError(403, "You are not authorized to update this Book!");
//   }

//   const updatedBookData: Partial<IBook> = { ...payload };
//   const result = await Book.findOneAndUpdate({ _id: id }, updatedCowData, {
//     new: true,
//   });
//   return result;
// };
// const deleteCow = async (id: string, userId: string): Promise<ICow | null> => {
//   const cow = await Cow.findOne({ _id: id });

//   if (!cow) {
//     throw new ApiError(404, "Cow not found!");
//   }

//   if (cow.seller.toString() !== userId) {
//     throw new ApiError(403, "You are not authorized to delete this cow!");
//   }

//   const result = await Cow.findByIdAndDelete(id);
//   return result;
// };
export const BookService = {
  getLatestBooks,
  getAllBooks,
  createBook,
  getSingleBook,
};
