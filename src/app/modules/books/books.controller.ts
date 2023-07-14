import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./books.interface";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import paiginationFields from "../../../constant/pagination";

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...BookData } = req.body;
    const result = await BookService.createBook(BookData);

    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  }
);
const postComment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const reviews = req.body.reviews;
    console.log(bookId, "BookId");

    const result = await BookService.postComment(bookId, reviews);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  }
);
const getComment = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const result = await BookService.getComment(bookId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});
const getLatestBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getLatestBooks();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paiginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  console.log(result);
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    meta: result.meta,
    data: result.data,
  });
});
// const getAllBooks = catchAsync(async (req: Request, res: Response) => {
//   const result = await BookService.getAllBooks();
//   sendResponse<IBook[]>(res, {
//     statusCode: 200,
//     success: true,
//     data: result,
//   });
// });

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(id, "bookid");
  console.log(updatedData, "updatedData");
  const result = await BookService.updateBook(id, updatedData);
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});
export const BookController = {
  createBook,
  getLatestBooks,
  getAllBooks,
  getSingleBook,
  postComment,
  getComment,
  updateBook,
  deleteBook,
};
