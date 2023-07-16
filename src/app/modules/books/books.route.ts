import express from "express";
import { BookController } from "./books.controller";

const router = express.Router();

router.post(
  "/",

  BookController.createBook
);

router.post(
  "/wishlist",

  BookController.createWishList
);
router.post(
  "/reading-list",

  BookController.createReadingList
);
router.get("/latest-book", BookController.getLatestBooks);
router.get("/wishlist", BookController.getWishlistBook);
router.get("/", BookController.getAllBooks);
router.get("/wishlist", BookController.getWishList);
router.get("/reading-list", BookController.getReadingList);
router.get(
  "/:id",

  BookController.getSingleBook
);
router.post(
  "/comment/:id",

  BookController.postComment
);
router.get(
  "/comment/:id",

  BookController.getComment
);
router.delete("/:id", BookController.deleteBook);
router.delete("/wishlist/:id", BookController.removeFromWishList);
router.delete("/reading-list/:id", BookController.removeFromReadingList);
router.patch("/:id", BookController.updateBook);

export const BookRoutes = router;
