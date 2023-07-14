/* eslint-disable @typescript-eslint/no-explicit-any */
"../../../interface/pagination";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { andConditionSearchFields } from "./book.constants";
import { IBook, IBookFilters } from "./books.interface";
import Book from "./books.model";
import { SortOrder, Types } from "mongoose";

const createBook = async (BookData: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(BookData);
  return newBook;
};

const postComment = async (id: string, reviews: string) => {
  const result = await Book.updateOne(
    { _id: new Types.ObjectId(id) },
    { $push: { reviews: reviews } }
  );
  console.log(result);

  if (result.modifiedCount !== 1) {
    console.error("Product not found or comment not added");
  }

  return result;
};

const getComment = async (id: string) => {
  const result = await Book.findOne({ _id: new Types.ObjectId(id) });
  console.log(result, "Get comment");
  return result;
};

const getLatestBooks = async (): Promise<IBook[]> => {
  const books = await Book.find().sort({ publicationDate: -1 }).limit(10);

  return books;
};
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: andConditionSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, "Book not found !");
  }

  const { ...BookData } = payload;

  const updatedBookData: Partial<IBook> = { ...BookData };

  const result = await Book.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true,
  });
  return result;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);

  return result;
};
export const BookService = {
  getLatestBooks,
  getAllBooks,
  createBook,
  getSingleBook,
  postComment,
  getComment,
  updateBook,
  deleteBook,
};
