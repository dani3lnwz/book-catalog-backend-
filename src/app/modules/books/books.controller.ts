import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./books.interface";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import paiginationFields from "../../../constant/pagination";
import { IReading } from "./interface";

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
const createWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...BookData } = req.body;
    const result = await BookService.createWishList(BookData);

    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Added in Wishlist",
      data: result,
    });
  }
);
const createReadingList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...BookData } = req.body;
    const result = await BookService.createReadingList(BookData);

    sendResponse<IReading>(res, {
      statusCode: 200,
      success: true,
      message: "Created Reading list",
      data: result,
    });
  }
);
const postComment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const reviews = req.body.reviews;

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

  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    meta: result.meta,
    data: result.data,
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
const getWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getWishList();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});
const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getReadingList();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

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
const removeFromWishList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const wishlistId = req.params.id;
    const result = await BookService.removeFromWishList(wishlistId);
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  }
);
const removeFromReadingList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const wishlistId = req.params.id;
    const result = await BookService.removeFromReadingList(wishlistId);
    sendResponse<IReading>(res, {
      statusCode: 200,
      success: true,
      message: "Deleted successfully",
      data: result,
    });
  }
);
const getWishlistBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getWishlistBook();
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
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
  createWishList,
  getWishList,
  removeFromWishList,
  getWishlistBook,
  createReadingList,
  getReadingList,
  removeFromReadingList,
};
