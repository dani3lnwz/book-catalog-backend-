import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./books.interface";
import { BookService } from "./book.service";

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

const getLatestBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getLatestBooks();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

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

// const updateBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req?.body;
//   const userId = req?.user?._id;
//   const result = await BookService.updateBook(id, updatedData, userId);
//   sendResponse<IBook>(res, {
//     statusCode: 200,
//     success: true,
//     message: "Book updated successfully",
//     data: result,
//   });
// });
// const deleteBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const userId = req?.user?._id; // Get the seller's user ID from the authenticated user

//   const result = await BookService.deleteBook(id, userId);
//   sendResponse<IBook>(res, {
//     statusCode: 200,
//     success: true,
//     message: "Book deleted successfully",
//     data: result,
//   });
// });
export const BookController = {
  createBook,
  getLatestBooks,
  getAllBooks,
  getSingleBook,
};
